import type { Meta, StoryObj } from "@storybook/react-vite";

import { TranslationOverview } from "./translation-overview";

const meta = {
  component: TranslationOverview,
  title: "widgets/translation-overview/translation-overview",
} satisfies Meta<typeof TranslationOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
