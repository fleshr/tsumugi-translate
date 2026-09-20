import { t, type Dictionary } from "intlayer";

const translatorConfigEditorContent = {
  key: "translator-config-editor",
  content: {
    select: {
      label: t({
        en: "Translator",
        ru: "",
      }),
      description: t({
        en: "Select translator to change configuration",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default translatorConfigEditorContent;
