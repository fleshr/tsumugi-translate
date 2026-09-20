import { queryOptions } from "@tanstack/react-query";

import { translationCommands } from "./commands";

export const translationSettingsQuery = queryOptions({
  queryFn: translationCommands.getSettings,
  queryKey: ["translation", "settings"],
});
