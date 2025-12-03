import type { StorybookConfig } from '@storybook/nextjs-vite'
import { mergeConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*/stories.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['..\\public'],

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        /**
         * ✔️ 빌드 결과 gzip + 브로틀리 압축
         * - 최종 사이즈 절반까지 줄어듦
         */
        viteCompression({ algorithm: 'brotliCompress' }),
        viteCompression({ algorithm: 'gzip' }),
      ],

      build: {
        /**
         * ✔️ 경고 임계치 상향
         */
        chunkSizeWarningLimit: 1200,

        /**
         * ✔️ 청크 분리(코드 스플리팅)
         * - react / swiper / datepicker / vendors 분리
         * - 랜더 규모가 절반 수준까지 줄어듦
         */
        rollupOptions: {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              swiper: ['swiper'],
              datepicker: ['react-datepicker'],
              vendors: ['lodash-es', 'date-fns'],
            },
          },
        },
      },

      /**
       * ✔️ lodash-es import 문제 해결
       * - alias + optimizeDeps + 제외 세트
       */
      resolve: {
        alias: {
          lodash: 'lodash-es',
          'lodash-es': 'lodash-es',
        },
      },

      optimizeDeps: {
        include: ['lodash-es'],
        exclude: ['lodash'], // 충돌 방지
        force: false,
      },

      ssr: {
        noExternal: ['lodash-es'], // SSR 오류 방지
      },

      /**
       * ✔️ 빌드 최적화 설정 추가
       */
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },

      esbuild: {
        /**
         * dead-code 제거 + tree-shaking 강제
         */
        pure: ['console.log', 'console.debug'],
        treeShaking: true,
      },
    })
  },
}

export default config
