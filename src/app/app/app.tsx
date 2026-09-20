import { AppShell, Divider, Stack } from "@mantine/core";

import { Sidebar } from "@/widgets/sidebar";
import { Titlebar } from "@/widgets/titlebar";
import { TranslationOverview } from "@/widgets/translation-overview";
import { TranslationTable } from "@/widgets/translation-table";

import classes from "./app.module.css";

export const App = () => {
  return (
    <Stack className={classes.container}>
      <Titlebar />
      <Divider />
      <AppShell mode="static" header={{ height: "auto" }} navbar={{ width: 260, breakpoint: "sm" }}>
        <AppShell.Header className={classes.header}>
          <TranslationOverview />
        </AppShell.Header>
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main className={classes.main}>
          <TranslationTable />
        </AppShell.Main>
      </AppShell>
    </Stack>
  );
};
