import { t, type Dictionary } from "intlayer";

const useNewProjectModalContent = {
  key: "use-new-project-modal",
  content: {
    modal: {
      title: t({
        en: "New project",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default useNewProjectModalContent;
