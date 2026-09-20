import "@mantine/core/styles.css";
import { type Decorator } from "@storybook/react-vite";

import { TestingProviders } from "../testing-providers";

export const withProviders: Decorator = (Story) => (
  <TestingProviders>
    <Story />
  </TestingProviders>
);
