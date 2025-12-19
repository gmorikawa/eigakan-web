import RoutesProvider from "./config/routes";
import ThemeProvider from "./config/theme";
import { UserSessionProvider } from "./features/auth/components/user-session-provider";
import { useAuthentication } from "./features/auth/hooks/authentication";

export function App() {
    const authentication = useAuthentication();

    return (
        <ThemeProvider>
            <UserSessionProvider value={authentication}>
                <RoutesProvider />
            </UserSessionProvider>
        </ThemeProvider>
    );
}

export default App;
