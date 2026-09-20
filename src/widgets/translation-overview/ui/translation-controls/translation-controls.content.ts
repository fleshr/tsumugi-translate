import { t, type Dictionary } from "intlayer";

const translationControlsContent = {
  key: "translation-controls",
  content: {
    startButton: {
      label: t({
        en: "Translate",
        ru: "",
      }),
    },
    stopButton: {
      label: t({
        en: "Stop",
        ru: "",
      }),
    },
    modeSelect: {
      batch: t({
        en: "Batch",
        ru: "",
      }),
      sequential: t({
        en: "Sequential",
        ru: "",
      }),
    },
  },
} satisfies Dictionary;

export default translationControlsContent;
