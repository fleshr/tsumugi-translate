import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { prefetchTranslationSettings } from "@/entities/translation";
import { prefetchTranslatorConfigs } from "@/entities/translator";

import { App } from "./app/app";
import { Providers } from "./providers";

prefetchTranslatorConfigs();
prefetchTranslationSettings();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
