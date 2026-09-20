import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProjectInfo } from "./project-info";

const meta = {
  component: ProjectInfo,
  title: "widgets/translation-overview/project-info",
} satisfies Meta<typeof ProjectInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
