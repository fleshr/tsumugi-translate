import { t, type Dictionary } from "intlayer";

const createProjectFormContent = {
  key: "create-project-form",
  content: {
    pathInput: {
      label: t({
        en: "Game folder",
        ru: "",
      }),
      placeholder: t({
        en: "Pick game folder",
        ru: "",
      }),
    },
    parserSelect: {
      label: t({
        en: "Game parser",
        ru: "",
      }),
      placeholder: t({
        en: "Select game parser",
        ru: "",
      }),
    },
    sourceLangSelect: {
      label: t({
        en: "Source language",
        ru: "",
      }),
    },
    targetLangSelect: {
      label: t({
        en: "Target language",
        ru: "",
      }),
    },
    cancelButton: {
      label: t({
        en: "Cancel",
        ru: "",
      }),
    },
    createButton: {
      label: t({
        en: "Create project",
        ru: "",
      }),
    },
    errors: {
      gamePath: t({
        en: "Target language",
        ru: "",
      }),
      parser: t({
        en: "Target language",
        ru: "",
      }),
    },
    languages: {
      en: t({
        en: "English",
        ru: "",
      }),
      ja: t({
        en: "Japanese",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default createProjectFormContent;
