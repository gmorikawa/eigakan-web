import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

export interface ThemeProviderProps {
    children?: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <MuiThemeProvider theme={createTheme({})}>
            {children}
        </MuiThemeProvider>
    );
}

export default ThemeProvider;