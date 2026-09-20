import type { Meta, StoryObj } from "@storybook/react-vite";

import { TranslationTable } from "./translation-table";

const meta = {
  component: TranslationTable,
  title: "widgets/translation-table/translation-table",
} satisfies Meta<typeof TranslationTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
