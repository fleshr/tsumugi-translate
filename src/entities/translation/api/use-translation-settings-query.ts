import { useSuspenseQuery } from "@tanstack/react-query";

import { translationSettingsQuery } from "./queries";

export const useTranslationSettingsQuery = () => {
  return useSuspenseQuery(translationSettingsQuery);
};
