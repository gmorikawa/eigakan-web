import { extendTheme, CssVarsProvider } from "@mui/joy/styles";

const customTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                secondary: {
                    50: "#fef2f2",
                    100: "#fee2e2",
                    200: "#fecaca",
                    300: "#fca5a7",
                    400: "#f87171",
                    500: "#d62d30",
                    600: "#c1292c",
                    700: "#a82326",
                    800: "#8f1e21",
                    900: "#7f1d1f",
                    solidBg: "#d62d30",
                    solidHoverBg: "#c1292c",
                    solidActiveBg: "#a82326",
                    solidColor: "#ffffff",
                    softBg: "#fee2e2",
                    softHoverBg: "#fecaca",
                    softActiveBg: "#fca5a7",
                    softColor: "#8f1e21",
                    // outlinedBg: "#ffffff",
                    outlinedHoverBg: "#fef2f2",
                    outlinedActiveBg: "#fee2e2",
                    outlinedBorder: "#d62d30",
                    outlinedColor: "#d62d30",
                    plainColor: "#d62d30",
                    plainHoverBg: "#fef2f2",
                    plainActiveBg: "#fee2e2",
                },
                primary: {
                    50: "#faf9f8",
                    100: "#f5f3f1",
                    200: "#ebe7e3",
                    300: "#d9d2cb",
                    400: "#b8aba0",
                    500: "#4a3a32",
                    600: "#43342d",
                    700: "#3a2d27",
                    800: "#322622",
                    900: "#2a201d",
                    solidBg: "#4a3a32",
                    solidHoverBg: "#43342d",
                    solidActiveBg: "#3a2d27",
                    solidColor: "#ffffff",
                    softBg: "#ebe7e3",
                    softHoverBg: "#d9d2cb",
                    softActiveBg: "#b8aba0",
                    softColor: "#322622",
                    outlinedBg: "#ffffff",
                    outlinedHoverBg: "#faf9f8",
                    outlinedActiveBg: "#f5f3f1",
                    outlinedBorder: "#4a3a32",
                    outlinedColor: "#4a3a32",
                    plainColor: "#4a3a32",
                    plainHoverBg: "#faf9f8",
                    plainActiveBg: "#f5f3f1",
                },
                success: {
                    solidBg: "#2DA44E",
                    solidHoverBg: "#2C974B",
                    solidActiveBg: "#298E46",
                },
                neutral: {
                    outlinedBg: "#F6F8FA",
                    outlinedHoverBg: "#F3F4F6",
                    outlinedActiveBg: "rgba(238, 239, 242, 1)",
                    outlinedBorder: "rgba(27, 31, 36, 0.15)",
                },
                focusVisible: "rgba(214, 45, 48, 0.3)",
            },
        },
    }
});

export interface ThemeProviderProps {
    children?: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <CssVarsProvider theme={customTheme}>
            {children}
        </CssVarsProvider>
    );
}

export default ThemeProvider;