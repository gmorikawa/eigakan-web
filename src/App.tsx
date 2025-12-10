import RoutesProvider from "./config/routes";
import ThemeProvider from "./config/theme";

export function App() {
    return (
        <ThemeProvider>
            <RoutesProvider />
        </ThemeProvider>
    );
}

export default App;
