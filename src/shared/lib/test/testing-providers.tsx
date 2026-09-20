import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { IntlayerProvider } from "react-intlayer";

import { modals } from "@/app/modals";
import { theme } from "@/app/theme";
import { queryClient } from "@/shared/api/query";

export const TestingProviders = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <IntlayerProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider env="test" theme={theme}>
          <ModalsProvider modals={modals}>
            {children}
            <Notifications />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </IntlayerProvider>
  );
};
