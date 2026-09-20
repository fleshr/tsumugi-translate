import { Table } from "@mantine/core";
import type { ReactTable } from "@tanstack/react-table";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import type { RefObject } from "react";

import type { Segment } from "@/shared/api/bindings";

import { rowHeight, type features } from "../../model/table";

interface TableBodyProps {
  table: ReactTable<typeof features, Segment>;
  tableContainerRef: RefObject<HTMLDivElement | null>;
}

export const TableBody = (props: TableBodyProps) => {
  const { table, tableContainerRef } = props;
  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const renderRow = (virtualRow: VirtualItem) => {
    const row = rows[virtualRow.index];

    return (
      <Table.Tr
        key={row.id}
        data-index={virtualRow.index}
        ref={virtualizer.measureElement}
        onClick={row.getToggleSelectedHandler()}
      >
        {row.getAllCells().map((cell) => (
          <Table.Td key={cell.id}>
            <table.FlexRender cell={cell} />
          </Table.Td>
        ))}
      </Table.Tr>
    );
  };

  return (
    <Table.Tbody>
      {virtualItems.length > 0 && (
        <tr aria-hidden>
          <td
            aria-hidden
            colSpan={3}
            style={{
              height: virtualItems[0].start,
              padding: 0,
              border: "none",
            }}
          />
        </tr>
      )}

      {virtualItems.map(renderRow)}

      {virtualItems.length > 0 && (
        <tr aria-hidden>
          <td
            aria-hidden
            colSpan={3}
            style={{
              height: virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end,
              padding: 0,
              border: "none",
            }}
          />
        </tr>
      )}
    </Table.Tbody>
  );
};
