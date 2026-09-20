import type { ReactNode } from "react";
import { render, type RenderOptions } from "vitest-browser-react";

import { TestingProviders } from "../testing-providers";

const customRender = (ui: ReactNode, options?: RenderOptions) => {
  return render(ui, { wrapper: TestingProviders, ...options });
};

export { customRender as render };
