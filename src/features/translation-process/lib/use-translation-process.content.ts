import { t, type Dictionary } from "intlayer";

const useTranslationProcessContent = {
  key: "use-translation-process",
  content: {
    errors: {
      translationError: t({
        en: "Translation error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useTranslationProcessContent;
