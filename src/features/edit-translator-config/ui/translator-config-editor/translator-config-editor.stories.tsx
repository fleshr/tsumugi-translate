import type { Meta, StoryObj } from "@storybook/react-vite";
import { mockIPC } from "@tauri-apps/api/mocks";

import type { TranslationSettings, TranslatorConfigs } from "@/shared/api/bindings";

import { TranslatorConfigEditor } from "./translator-config-editor";

const meta = {
  component: TranslatorConfigEditor,
  title: "features/edit-translator-config/translator-config-editor",
  beforeEach: () => {
    mockIPC((cmd) => {
      if (cmd === "get_translator_configs") {
        return {
          fake: {
            delay: 3000,
          },
          openai: {
            baseUrl: "baseUrl",
            apiKey: "apiKey",
            model: "model",
            systemPrompt: "systemPrompt",
          },
        } satisfies TranslatorConfigs;
      } else if (cmd === "get_translation_settings") {
        return { mode: "batch", translator: "fake", batchSize: 10 } satisfies TranslationSettings;
      }
    });
  },
} satisfies Meta<typeof TranslatorConfigEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
