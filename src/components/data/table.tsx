import { Table as JoyTable, type TableProps as JoyTableProps } from "@mui/joy";

export interface TableProps extends JoyTableProps { }

export function Table(props: TableProps) {
    return <JoyTable {...props} />;
}

export default Table;