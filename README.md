# Storybook 컴포넌트 라이브러리

재사용 가능한 UI 컴포넌트를 만들고 문서화하며 통합 테스트와 시각적 문서화를 지원하는 포괄적인 **Next.js + Storybook** 컴포넌트 라이브러리 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 Storybook 기반 문서화, 포괄적인 시각적 테스트, 접근성 준수를 갖춘 중앙화된 컴포넌트 라이브러리 역할을 합니다. 접근성 및 테스트 인프라가 내장된 컴포넌트 중심의 개발 방식을 따릅니다.

### 기술 스택

- **프레임워크**: [Next.js 16](https://nextjs.org) (Pages Router) + React 19
- **스타일링**: SCSS 모듈 (컴포넌트별로 정렬됨)
- **컴포넌트 문서화**: `@storybook/nextjs-vite`가 포함된 [Storybook 10](https://storybook.js.org)
- **테스트**: [Vitest 4](https://vitest.dev) + [Playwright](https://playwright.dev) + Storybook addon-vitest
- **빌드 시스템**: Vite 기반 (Storybook의 nextjs-vite 사용)
- **린팅**: ESLint with Next.js core-web-vitals 설정

## 🏗️ 프로젝트 구조

```
src/
├── components/
│   ├── UI/              # 재사용 가능한 UI 컴포넌트 (Button, Modal, Breadcrumb 등)
│   ├── Form/            # 폼 관련 컴포넌트 (Input, Checkbox, SelectBox 등)
│   ├── layout/          # 레이아웃 래퍼 컴포넌트
│   └── common/          # 공유 유틸리티 (SkipToContent 등)
├── app/                 # Next.js 페이지 (app Router 패턴)
├── contexts/            # React 컨텍스트 (ViewportProvider 등)
├── styles/              # 글로벌 SCSS 스타일 (컴포넌트별로 정렬됨)
└── data/                # 정적 데이터 파일
.storybook/              # Storybook 설정
public/                  # 정적 자산 (이미지, 폰트 등)
```

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 개발 명령어

| 명령어                    | 설명                                    |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Next.js 개발 서버 시작 (localhost:3000) |
| `npm run storybook`       | Storybook 시작 (localhost:6006)         |
| `npm run build`           | 프로덕션용 Next.js 앱 빌드              |
| `npm run build-storybook` | 정적 Storybook 출력 빌드                |
| `npm run lint`            | ESLint 실행                             |

### 개발 시작

**옵션 1: Storybook (컴포넌트 개발에 권장)**

```bash
npm run storybook
```

[http://localhost:6006](http://localhost:6006)을 열어 컴포넌트 스토리 및 문서화를 확인합니다.

**옵션 2: Next.js 앱**

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)을 열어 메인 애플리케이션을 확인합니다.

## 📦 컴포넌트 개발

### Storybook-First 워크플로우

1. **컴포넌트 생성**

   ```bash
   src/components/{category}/{ComponentName}.tsx
   ```

2. **스토리 파일 생성**

   ```bash
   src/components/{category}/{ComponentName}.stories.tsx
   ```

3. **스토리 템플릿**

   ```tsx
   import type { Meta, StoryObj } from '@storybook/nextjs-vite'
   import { Button } from '@/components/UI/Button'

   const meta = {
     title: 'UI/Button',
     component: Button,
     tags: ['autodocs'],
   } satisfies Meta<typeof Button>

   export default meta
   type Story = StoryObj<typeof meta>

   export const Primary: Story = {
     args: { label: 'Click me', level: 'primary' },
   }
   ```

### 컴포넌트 규칙

**Props 문서화**

- TypeScript 인터페이스와 JSDoc 주석 사용
- 모든 prop의 목적과 타입 문서화
- 기본값 포함

```tsx
export interface ButtonProps {
  /** 버튼 텍스트 레이블 */
  label: string
  /** 버튼 계층 수준 */
  level?: 'primary' | 'secondary' | 'tertiary'
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large'
}
```

**스타일링 패턴**

- 컴포넌트 스타일: `src/styles/{component-name}.scss`
- `@use` 지시문을 통해 모든 스타일이 `src/styles/globals.scss`에 통합됨
- BEM 유사 네이밍 사용: `.component-name`, `.component-name__item`
- **컴포넌트에서 SCSS를 직접 임포트하지 말 것** - 스타일은 globals.scss를 통해 로드됨

**네비게이션**

- 내부 네비게이션에 Next.js `Link` 컴포넌트 사용
- 예시: `src/components/UI/Breadcrumb.tsx` 참고

## 🧪 테스트

### Vitest + Storybook 통합

테스트는 브라우저 지원이 포함된 Storybook의 addon-vitest를 통해 실행됩니다:

```bash
# 테스트 실행 (Vitest 사용)
npm run test
```

**테스트 설정**

- Playwright (chromium)를 통한 브라우저 테스팅
- 설정 파일: `.storybook/vitest.setup.ts`
- `src/**/*.stories.@(ts|tsx)`에서 테스트 자동 발견

### 접근성 (A11y)

- `addon-a11y`와 통합된 A11y 애드온
- 현재 상태: 개발 중
- Storybook의 A11y 패널에서 접근성 테스트 확인

## 🔗 주요 통합 포인트

### 경로 별칭

프로젝트 전체에서 `@/*`을 사용하여 임포트합니다:

```tsx
import { Button } from '@/components/UI/Button'
import { ViewportProvider } from '@/contexts/viewPortContext'
import '@/styles/globals.scss'
```

### 컨텍스트 & 공급자

- **ViewportProvider**: 뷰포트 상태 관리를 위해 전체 앱을 래핑
  - 위치: `src/contexts/viewPortContext.tsx`
  - 사용: 모든 페이지와 컴포넌트에서 접근 가능

### 레이아웃 패턴

페이지는 `getLayout` 패턴을 통해 커스텀 레이아웃을 정의할 수 있습니다:

```tsx
type NextPageWithLayout = React.ComponentType & {
  getLayout?: (page: React.ReactNode) => React.ReactNode
}
```

### 원격 이미지

- Next.js가 `picsum.photos`에서 이미지를 제공하도록 설정됨
- 설정: `next.config.ts`

### Storybook 스토리 정렬

스토리는 다음 순서로 정렬됩니다: **Guide → Form → UI**

- 제어: `.storybook/preview.tsx` (storySort 설정)

## 📝 Storybook 기능

- **Autodocs**: JSDoc 주석에서 자동 문서화 생성
- **Stories**: 인터랙티브 컴포넌트 플레이그라운드
- **Docs**: MDX 기반 커스텀 문서화
- **Controls**: 인터랙티브 prop 탐색
- **A11y Panel**: 접근성 감사
- **Chromatic 통합**: 시각적 회귀 테스트 (선택사항)

## 🛠️ 설정 파일

| 파일                     | 설명                                  |
| ------------------------ | ------------------------------------- |
| `next.config.ts`         | Next.js 설정                          |
| `tsconfig.json`          | `@/` 경로 별칭이 있는 TypeScript 설정 |
| `vitest.config.ts`       | Vitest 테스트 설정                    |
| `.storybook/main.ts`     | Storybook 핵심 설정                   |
| `.storybook/preview.tsx` | Storybook UI 및 스토리 설정           |
| `eslint.config.mjs`      | ESLint 규칙                           |

## 🎯 개발자 가이드라인

1. **항상 `@/` 경로 사용** - 모듈 간에 상대 경로 임포트 사용 금지
2. **컴포넌트 ↔ 스토리 페어링** - 각 컴포넌트는 반드시 `.stories.tsx` 파일을 가져야 함
3. **Autodocs 활성화** - 스토리 메타에 `tags: ['autodocs']` 추가
4. **SCSS 글로벌 등록** - 컴포넌트에서 SCSS를 임포트하지 말 것
5. **Next.js Link 사용** - 내부 네비게이션에는 항상 `Link` 컴포넌트 사용

## 📚 더 알아보기

- [Next.js 문서](https://nextjs.org/docs)
- [Storybook 문서](https://storybook.js.org/docs/react)
- [Vitest 문서](https://vitest.dev)
- [React 19 기능](https://react.dev)
- [SCSS 문서](https://sass-lang.com/documentation)

## 🚢 배포

### 프로덕션을 위한 빌드

```bash
npm run build
npm start
```

### Storybook 정적 사이트 빌드

```bash
npm run build-storybook
```

출력은 `storybook-static/`에 생성되며 모든 정적 서버에서 호스팅할 수 있습니다.

## 📄 라이선스

이 프로젝트는 컴포넌트 라이브러리 이니셔티브의 일부입니다. 자세한 내용은 저장소 문서를 참조하세요.
