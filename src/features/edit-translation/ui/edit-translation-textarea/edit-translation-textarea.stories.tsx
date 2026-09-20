import type { Meta, StoryObj } from "@storybook/react-vite";

import { EditTranslationTextarea } from "./edit-translation-textarea";

const meta = {
  component: EditTranslationTextarea,
  title: "features/edit-translation/edit-translation-textarea",
} satisfies Meta<typeof EditTranslationTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: "test" },
};
