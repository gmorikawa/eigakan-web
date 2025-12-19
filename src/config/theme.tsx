import { extendTheme, CssVarsProvider } from "@mui/joy/styles";

const customTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                success: {
                    solidBg: '#2DA44E',
                    solidHoverBg: '#2C974B',
                    solidActiveBg: '#298E46',
                },
                neutral: {
                    outlinedBg: '#F6F8FA',
                    outlinedHoverBg: '#F3F4F6',
                    outlinedActiveBg: 'rgba(238, 239, 242, 1)',
                    outlinedBorder: 'rgba(27, 31, 36, 0.15)',
                },
                focusVisible: 'rgba(3, 102, 214, 0.3)',
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