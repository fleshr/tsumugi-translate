import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";
import { IntlayerProvider } from "react-intlayer";

import { queryClient } from "@/shared/api/query";

import { modals } from "./modals";
import { theme } from "./theme";

export const Providers = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <IntlayerProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider modals={modals}>
            {children}
            <Notifications />
            <ReactQueryDevtools initialIsOpen={false} />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </IntlayerProvider>
  );
};
