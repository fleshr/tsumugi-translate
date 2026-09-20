import { t, type Dictionary } from "intlayer";

const useOpenProjectMutationContent = {
  key: "use-open-project-mutation",
  content: {
    errors: {
      invalidPath: t({
        en: "Project file not found",
        ru: "",
      }),
      fileRead: t({
        en: "Failed to read project file",
        ru: "",
      }),
      parseError: t({
        en: "Failed to parse project file",
        ru: "",
      }),
      unknownError: t({
        en: "Unknown error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useOpenProjectMutationContent;
