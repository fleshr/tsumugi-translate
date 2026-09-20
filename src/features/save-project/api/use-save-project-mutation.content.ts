import { t, type Dictionary } from "intlayer";

const useSaveProjectMutationContent = {
  key: "use-save-project-mutation",
  content: {
    errors: {
      invalidPath: t({
        en: "Cannot save project to this path",
        ru: "",
      }),
      emptyProject: t({
        en: "Cannot save empty project",
        ru: "",
      }),
      serializeError: t({
        en: "Project serialization error",
        ru: "",
      }),
      writeError: t({
        en: "Cannot save project to this file",
        ru: "",
      }),
      unknownError: t({
        en: "Unknown error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useSaveProjectMutationContent;
