import { t, type Dictionary } from "intlayer";

const useStartTranslationMutationContent = {
  key: "use-start-translation-mutation",
  content: {
    errors: {
      emptyProject: t({
        en: "Create project for translation",
        ru: "",
      }),
      alreadyRunning: t({
        en: "Translation already running",
        ru: "",
      }),
      unknown: t({
        en: "Unknown error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useStartTranslationMutationContent;
