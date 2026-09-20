import { t, type Dictionary } from "intlayer";

const useStopTranslationMutationContent = {
  key: "use-stop-translation-mutation",
  content: {
    errors: {
      notRunning: t({
        en: "Translation not running",
        ru: "",
      }),
      unknown: t({
        en: "Unknown error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useStopTranslationMutationContent;
