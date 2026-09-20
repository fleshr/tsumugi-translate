import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { CreateProjectForm } from "./create-project-form";

const meta = {
  component: CreateProjectForm,
  title: "features/create-project/create-project-form",
} satisfies Meta<typeof CreateProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCancel: fn(),
    onCreate: fn(),
  },
};
