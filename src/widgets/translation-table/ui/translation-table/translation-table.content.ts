import { t, type Dictionary } from "intlayer";

const translationTableContent = {
  key: "translation-table",
  content: {
    rowNumberHeader: t({
      en: "#",
      ru: "#",
    }),
    originalHeader: t({
      en: "Original text",
      ru: "",
    }),
    translatedHeader: t({
      en: "Translated text",
      ru: "",
    }),
  },
} satisfies Dictionary;

export default translationTableContent;
