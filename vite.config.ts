import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), intlayer()],
  resolve: { tsconfigPaths: true },

  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    host: host || false,
    hmr: host ? { protocol: "ws", host, port: 1421 } : undefined,
    watch: { ignored: ["**/src-tauri/**"] },
  },
});
