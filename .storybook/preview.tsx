import React, { ReactNode } from 'react';
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs/blocks';
import type { Preview } from '@storybook/nextjs-vite';
import '@/styles/globals.scss';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          'Guide',
          'Common',
          'UI',
          [
            'Accordion',
            'BoardList',
            'Breadcrumb',
            'Button',
            'Card',
            'CardList',
            'Divider',
            'Grid',
            'Modal',
            'Pagination',
            'Swiper',
            'SystemAlert',
            'Tab',
            'Table',
            'Toast',
            'Tooltip',
          ],
          'Form',
          [
            'Input',
            'Checkbox',
            'Switch',
            'RadioGroup',
            'TextArea',
            'SelectBox',
          ],
        ],
      },
    },
    a11y: {
      test: 'todo', // todo / error / off
    },

    // Docs 활성화
    docs: {
      autodocs: true, // MDX에서 <Meta>, <Canvas>, <Story> 사용 가능
      inlineStories: true, // 필요시
      container: ({
        children,
        context,
      }: {
        children: ReactNode;
        context: DocsContextProps;
      }) => (
        <DocsContainer {...{ context }}>
          <div className="sb-unstyled">{children}</div>
        </DocsContainer>
      ),
    },
  },
};

export default preview;
