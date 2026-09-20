import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsTabs } from "./settings-tabs";

const meta = {
  component: SettingsTabs,
  title: "widgets/titlebar/settings-tabs",
} satisfies Meta<typeof SettingsTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
