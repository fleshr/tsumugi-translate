import type { Meta, StoryObj } from "@storybook/react-vite";
import { mockIPC } from "@tauri-apps/api/mocks";

import type { TranslationSettings } from "@/shared/api/bindings";

import { TranslationSettingsForm } from "./translation-settings-form";

const meta = {
  component: TranslationSettingsForm,
  title: "features/edit-translation-settings/translation-settings-form",
  beforeEach: () => {
    mockIPC((cmd) => {
      if (cmd === "get_translation_settings") {
        return {
          mode: "batch",
          translator: "fake",
          batchSize: 10,
        } satisfies TranslationSettings;
      }
    });
  },
} satisfies Meta<typeof TranslationSettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
