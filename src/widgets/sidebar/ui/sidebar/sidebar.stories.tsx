import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sidebar } from "./sidebar";

const meta = {
  component: Sidebar,
  title: "widgets/sidebar/sidebar",
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
