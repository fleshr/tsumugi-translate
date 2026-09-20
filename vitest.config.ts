import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          test: {
            include: ["src/**/*.unit.test.{ts,tsx}"],
            name: "unit",
            environment: "node",
          },
        },
        {
          test: {
            include: ["src/**/*.browser.test.{ts,tsx}"],
            name: "browser",
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: "chromium" }],
            },
          },
        },
      ],
    },
  }),
);
