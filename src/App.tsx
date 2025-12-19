import { AlertProvider } from "@components/feedback/alert";
import { RouteProvider } from "@config/routes";
import { ThemeProvider } from "@config/theme";
import { UserSessionProvider } from "@features/auth/components/user-session-provider";

export function App() {
    return (
        <ThemeProvider>
            <AlertProvider>
                <UserSessionProvider>
                    <RouteProvider />
                </UserSessionProvider>
            </AlertProvider>
        </ThemeProvider>
    );
}

export default App;
