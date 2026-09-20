import type { Meta, StoryObj } from "@storybook/react-vite";

import { TitleMenu } from "./title-menu";

const meta = {
  component: TitleMenu,
  title: "widgets/titlebar/title-menu",
} satisfies Meta<typeof TitleMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
