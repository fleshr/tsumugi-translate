import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppSettingsForm } from "./app-settings-form";

const meta = {
  component: AppSettingsForm,
  title: "features/edit-app-settings/app-settings-form",
} satisfies Meta<typeof AppSettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
