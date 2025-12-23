import { Table as JoyTable, type TableProps as JoyTableProps } from "@mui/joy";
import type { ThemePalette } from "@shared/types/theme";

export interface TableProps extends JoyTableProps {
    palette?: ThemePalette;
}

export function Table({ palette = "primary", ...props }: TableProps) {
    return <JoyTable color={palette} {...props} />;
}

export default Table;