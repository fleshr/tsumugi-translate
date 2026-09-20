import { Table } from "@mantine/core";
import type { ReactTable } from "@tanstack/react-table";

import type { Segment } from "@/shared/api/bindings";

import type { features } from "../../model/table";

interface TableHeadProps {
  table: ReactTable<typeof features, Segment>;
}

export const TableHead = (props: TableHeadProps) => {
  const { table } = props;

  return (
    <Table.Thead>
      <Table.Tr>
        {table.getFlatHeaders().map((header) => (
          <Table.Th key={header.id}>
            <table.FlexRender header={header} />
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};
