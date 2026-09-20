import { Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { LogoIcon } from "./logo-icon";

const meta = {
  title: "shared/icons",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack>
      <LogoIcon />
    </Stack>
  ),
};
