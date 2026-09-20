import { noop } from "@tanstack/react-query";

import { queryClient } from "@/shared/api/query";

import { translatorConfigsQuery } from "./queries";

export const prefetchTranslatorConfigs = async () => {
  await queryClient.query(translatorConfigsQuery).catch(noop);
};
