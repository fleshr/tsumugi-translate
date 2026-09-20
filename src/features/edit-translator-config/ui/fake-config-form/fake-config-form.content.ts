import { t, type Dictionary } from "intlayer";

const fakeConfigFormContent = {
  key: "fake-config-form",
  content: {
    delay: {
      label: t({
        en: "Delay",
        ru: "",
      }),
      description: t({
        en: "Delay between requests (ms)",
        ru: "",
      }),
      error: t({
        en: "Must be positive",
        ru: "",
      }),
    },
    save: {
      label: t({
        en: "Save",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default fakeConfigFormContent;
