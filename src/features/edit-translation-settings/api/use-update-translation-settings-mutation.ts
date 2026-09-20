import { useMutation } from "@tanstack/react-query";

import { translationCommands } from "@/entities/translation";
import { queryClient } from "@/shared/api/query";

export const useUpdateTranslationSettingsMutation = () => {
  return useMutation({
    mutationFn: translationCommands.updateSettings,
    mutationKey: ["translation", "settings", "update"],
    onSuccess: (settings) => {
      queryClient.setQueryData(["translation", "settings"], settings);
    },
  });
};
