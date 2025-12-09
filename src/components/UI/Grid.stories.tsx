import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@/components/UI/Grid';

const meta: Meta<typeof Grid> = {
  title: 'UI/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 6 } },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'space-between', 'space-around'],
    },
    gap: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    columns: 3,
    align: 'stretch',
    justify: 'start',
    gap: '1.2rem',
    children: Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '5rem',
          background: '#eee',
          border: '.1rem solid #ccc',
          textAlign: 'center',
        }}
      >
        Item {i + 1}
      </div>
    )),
  },
};

export const CenterAligned: Story = {
  args: {
    columns: 4,
    align: 'center',
    justify: 'center',
    gap: '1.2rem',
    children: Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '5rem',
          background: '#def',
          border: '.1rem solid #99c',
          textAlign: 'center',
        }}
      >
        Item {i + 1}
      </div>
    )),
  },
};

export const SpaceAround: Story = {
  args: {
    columns: 3,
    align: 'center',
    justify: 'space-around',
    gap: '1.2rem',
    children: Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '5rem',
          background: '#fde',
          border: '.1rem solid #c99',
          textAlign: 'center',
        }}
      >
        Item {i + 1}
      </div>
    )),
  },
};
