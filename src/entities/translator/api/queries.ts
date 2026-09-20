import { queryOptions } from "@tanstack/react-query";

import { translatorCommands } from "./commands";

export const translatorConfigsQuery = queryOptions({
  queryFn: translatorCommands.getConfigs,
  queryKey: ["translator", "configs"],
});
