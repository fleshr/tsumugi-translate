import { t, type Dictionary } from "intlayer";

const appSettingsFormContent = {
  key: "app-settings-form",
  content: {
    theme: {
      label: t({
        en: "Theme",
        ru: "",
      }),
    },
    language: {
      label: t({
        en: "Language",
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

export default appSettingsFormContent;
