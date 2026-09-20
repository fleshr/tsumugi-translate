import { Table } from "@mantine/core";
import { useTable } from "@tanstack/react-table";
import { useRef } from "react";
import { useIntlayer } from "react-intlayer";

import { getSegments, useTranslationStore } from "@/entities/translation";
import { EditTranslationTextarea } from "@/features/edit-translation";
import { getSelectedFile, useSessionStore } from "@/shared/model/sessionStore";

import { columnHelper, features } from "../../model/table";
import { TableBody } from "../table-body/table-body";
import { TableHead } from "../table-head/table-head";

import classes from "./translation-table.module.css";

export const TranslationTable = () => {
  const content = useIntlayer("translation-table");
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const selectedFile = useSessionStore(getSelectedFile());
  const segments = useTranslationStore(getSegments(selectedFile));

  const columns = columnHelper.columns([
    columnHelper.display({
      header: content.rowNumberHeader.value,
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("original", {
      header: content.originalHeader.value,
    }),
    columnHelper.accessor("translated", {
      header: content.translatedHeader.value,
      cell: ({ row, getValue }) =>
        row.getIsSelected() ? (
          <EditTranslationTextarea
            autoFocus
            id={row.id}
            defaultValue={getValue()}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          getValue()
        ),
    }),
  ]);

  const table = useTable(
    {
      features,
      columns,
      data: segments,
      getRowId: ({ id }) => id,
      enableRowSelection: true,
      enableMultiRowSelection: false,
    },
    (state) => state,
  );

  return (
    <Table.ScrollContainer
      minWidth={500}
      className={classes.container}
      scrollAreaProps={{ viewportRef: tableContainerRef }}
    >
      <Table layout="fixed" classNames={classes} stickyHeader highlightOnHover>
        <TableHead table={table} />
        <TableBody table={table} tableContainerRef={tableContainerRef} />
      </Table>
    </Table.ScrollContainer>
  );
};
