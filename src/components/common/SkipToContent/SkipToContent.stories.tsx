import type { Meta, StoryObj } from '@storybook/react';
import SkipToContent from '@/components/common/SkipToContent/SkipToContent';

const meta: Meta<typeof SkipToContent> = {
  title: 'Common/SkipToContent',
  component: SkipToContent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SkipToContent>;

export const Default: Story = {
  render: () => (
    <>
      <SkipToContent />
      <p>🔍 탭(Tab) 키를 눌러 포커스가 링크로 이동하면 Skip 링크가 보입니다.</p>
      <br />
      <main id="main" tabIndex={0}>
        메인 컨텐츠
      </main>
      <br />
      <nav id="gnb" tabIndex={0}>
        메뉴
      </nav>
    </>
  ),
};
