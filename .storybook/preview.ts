import type { Preview } from "@storybook/react-vite";
import { mockIPC, mockWindows } from "@tauri-apps/api/mocks";

import { withProviders } from "@/shared/lib/test/storybook";

const preview: Preview = {
  decorators: [withProviders],
  beforeAll: () => {
    mockWindows("main");
    mockIPC(() => {}, { shouldMockEvents: true });
  },
};

export default preview;
