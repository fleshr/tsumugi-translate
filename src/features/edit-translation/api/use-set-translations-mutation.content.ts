import { t, type Dictionary } from "intlayer";

const useSetTranslationsMutationContent = {
  key: "use-set-translations-mutation",
  content: {
    errors: {
      emptyProject: t({
        en: "Cannot edit for empty project",
        ru: "",
      }),
      segmentNotFount: t({
        en: "Segment not found",
        ru: "",
      }),
      unknownError: t({
        en: "Unknown error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useSetTranslationsMutationContent;
