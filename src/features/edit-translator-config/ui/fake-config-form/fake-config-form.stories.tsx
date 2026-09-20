import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { FakeConfigForm } from "./fake-config-form";

const meta = {
  component: FakeConfigForm,
  title: "features/edit-translator-config/fake-config-form",
} satisfies Meta<typeof FakeConfigForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValues: { delay: 3000 },
    onSave: fn(),
  },
};
