import type { Meta, StoryObj } from "@storybook/react-vite";

import { Titlebar } from "./titlebar";

const meta = {
  component: Titlebar,
  title: "widgets/titlebar/titlebar",
} satisfies Meta<typeof Titlebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
