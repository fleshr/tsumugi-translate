import { useSuspenseQuery } from "@tanstack/react-query";

import { translatorConfigsQuery } from "./queries";

export const useTranslatorConfigsQuery = () => {
  return useSuspenseQuery(translatorConfigsQuery);
};
