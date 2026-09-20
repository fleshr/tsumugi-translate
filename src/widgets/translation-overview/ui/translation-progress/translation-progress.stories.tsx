import type { Meta, StoryObj } from "@storybook/react-vite";

import { TranslationProgress } from "./translation-progress";

const meta = {
  component: TranslationProgress,
  title: "widgets/translation-overview/translation-progress",
} satisfies Meta<typeof TranslationProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
