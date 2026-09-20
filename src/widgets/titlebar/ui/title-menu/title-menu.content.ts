import { t, type Dictionary } from "intlayer";

const titleMenuContent = {
  key: "title-menu",
  content: {
    project: {
      label: t({
        en: "Project",
        ru: "",
      }),

      new: {
        label: t({
          en: "New project",
          ru: "",
        }),
      },
      open: {
        label: t({
          en: "Open project",
          ru: "",
        }),
      },
      save: {
        label: t({
          en: "Save",
          ru: "",
        }),
      },
      saveAs: {
        label: t({
          en: "Save as",
          ru: "",
        }),
      },
      settings: {
        label: t({
          en: "Settings",
          ru: "",
        }),
      },
      exit: {
        label: t({
          en: "Exit",
          ru: "",
        }),
      },
    },
    help: {
      label: t({
        en: "Help",
        ru: "",
      }),

      documentation: {
        label: t({
          en: "Documentation",
          ru: "",
        }),
      },
      about: {
        label: t({
          en: "About",
          ru: "",
        }),
      },
    },
  },
} satisfies Dictionary;

export default titleMenuContent;
