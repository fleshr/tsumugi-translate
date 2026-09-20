import { t, type Dictionary } from "intlayer";

const openAIConfigFormContent = {
  key: "openai-config-form",
  content: {
    baseUrl: {
      label: t({
        en: "Base URL",
        ru: "",
      }),
      error: t({
        en: "Invalid URL",
        ru: "",
      }),
    },
    apiKey: {
      label: t({
        en: "Api key",
        ru: "",
      }),
    },
    model: {
      label: t({
        en: "Model",
        ru: "",
      }),
    },
    systemPrompt: {
      label: t({
        en: "System prompt",
        ru: "",
      }),
    },
    save: {
      label: t({
        en: "Save",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default openAIConfigFormContent;
