import { t, type Dictionary } from "intlayer";

const translationSettingsFormContent = {
  key: "translation-settings-form",
  content: {
    mode: {
      label: t({
        en: "Translation mode",
        ru: "",
      }),
    },
    translator: {
      label: t({
        en: "Selected translator",
        ru: "",
      }),
    },
    batchSize: {
      label: t({
        en: "Batch size",
        ru: "",
      }),
      description: t({
        en: "Number of segments per request in batch mode",
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

export default translationSettingsFormContent;
