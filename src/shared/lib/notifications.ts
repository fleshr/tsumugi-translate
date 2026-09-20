import { notifications } from "@mantine/notifications";
import type { ReactNode } from "react";

export const notify = {
  info: (message: ReactNode) => {
    notifications.show({ message, withBorder: true });
  },
  error: (message: ReactNode) => {
    notifications.show({ message, withBorder: true, color: "red" });
  },
};
