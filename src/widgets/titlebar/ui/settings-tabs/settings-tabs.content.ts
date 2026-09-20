import { t, type Dictionary } from "intlayer";

const settingsTabsContent = {
  key: "settings-tabs",
  content: {
    app: {
      label: t({
        en: "App",
        ru: "",
      }),
    },
    translation: {
      label: t({
        en: "Translation",
        ru: "",
      }),
    },
    translators: {
      label: t({
        en: "Translators",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default settingsTabsContent;
