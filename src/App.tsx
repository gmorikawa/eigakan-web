import { AlertProvider } from "@components/feedback/alert";
import RoutesProvider from "./config/routes";
import ThemeProvider from "./config/theme";
import { UserSessionProvider } from "./features/auth/components/user-session-provider";

export function App() {
    return (
        <ThemeProvider>
            <AlertProvider>
                <UserSessionProvider>
                    <RoutesProvider />
                </UserSessionProvider>
            </AlertProvider>
        </ThemeProvider>
    );
}

export default App;
