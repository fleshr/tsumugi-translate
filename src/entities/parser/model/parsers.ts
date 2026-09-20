import type { ParserKind } from "@/shared/api/bindings";

export const parsers: Record<ParserKind, { value: ParserKind; label: string }> = {
  entis: {
    value: "entis",
    label: "Entis Parser",
  },
};
