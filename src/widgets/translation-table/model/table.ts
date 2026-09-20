import { createColumnHelper, rowSelectionFeature, tableFeatures } from "@tanstack/react-table";

import type { Segment } from "@/shared/api/bindings";

export const rowHeight = 36;
export const features = tableFeatures({ rowSelectionFeature });
export const columnHelper = createColumnHelper<typeof features, Segment>();
