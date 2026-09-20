import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { PathInput } from "./path-input";

const meta = {
  component: PathInput,
  title: "shared/path-input",
} satisfies Meta<typeof PathInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    description: "Description",
    onChange: fn(),
    onPathChange: fn(),
  },
};
