import { useMutation } from "@tanstack/react-query";

import { translationCommands } from "@/entities/translation";
import { queryClient } from "@/shared/api/query";

export const useSetTranslationSettingsMutation = () => {
  return useMutation({
    mutationFn: translationCommands.setSettings,
    mutationKey: ["translation", "settings", "set"],
    onSuccess: (settings) => {
      queryClient.setQueryData(["translation", "settings"], settings);
    },
  });
};
