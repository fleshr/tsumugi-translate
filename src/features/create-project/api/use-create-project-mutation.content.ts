import { t, type Dictionary } from "intlayer";

const useCreateProjectMutationContent = {
  key: "use-create-project-mutation",
  content: {
    errors: {
      pathNotFound: t({
        en: "Game path not found",
        ru: "",
      }),
      unknownError: t({
        en: "Unknown error",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useCreateProjectMutationContent;
