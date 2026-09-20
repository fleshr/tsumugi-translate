import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileButton } from "./file-button";

const meta = {
  component: FileButton,
  title: "widgets/sidebar/file-button",
  args: {
    label: "Button",
  },
} satisfies Meta<typeof FileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};
