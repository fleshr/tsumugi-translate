import type { Meta, StoryObj } from "@storybook/react-vite";

import { TransaltionControls } from "./translation-controls";

const meta = {
  component: TransaltionControls,
  title: "widgets/translation-overview/translation-controls",
} satisfies Meta<typeof TransaltionControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
