import { open } from "@tauri-apps/plugin-dialog";
import { expect, test, vi } from "vitest";
import { userEvent } from "vitest/browser";

import { render } from "@/shared/lib/test/vitest";

import { PathInput } from "./path-input";

vi.mock("@tauri-apps/plugin-dialog", { spy: true });

test("test", async () => {
  const onPathChangeMock = vi.fn();
  vi.mocked(open).mockResolvedValue("/test/path");

  const { getByTestId } = await render(<PathInput onPathChange={onPathChangeMock} />);

  await userEvent.click(getByTestId("PathInput.BrowseButton"));

  expect(onPathChangeMock).toHaveBeenCalledWith("/test/path");
});
