import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { OpenAIConfigForm } from "./openai-config-form";

const meta = {
  component: OpenAIConfigForm,
  title: "features/edit-translator-config/openai-config-form",
} satisfies Meta<typeof OpenAIConfigForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValues: {
      baseUrl: "baseUrl",
      apiKey: "apiKey",
      model: "model",
      systemPrompt: "systemPrompt",
    },
    onSave: fn(),
  },
};
