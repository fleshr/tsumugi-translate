import { noop } from "@tanstack/react-query";

import { queryClient } from "@/shared/api/query";

import { translationSettingsQuery } from "./queries";

export const prefetchTranslationSettings = async () => {
  await queryClient.query(translationSettingsQuery).catch(noop);
};
