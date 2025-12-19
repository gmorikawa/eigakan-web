import { Snackbar } from "@mui/joy";
import { createContext, useContext, useEffect, useState } from "react";

export type AlertType = "success" | "error" | "warning";

export interface AlertController {
    showMessage(message: string, type?: AlertType): void;
}

export interface AlertProps {
    open: boolean;
    message: string;
    type?: AlertType;
    onClose?: () => void;
}

export const AlertContext = createContext<AlertController>({ showMessage: () => { } });

export function Alert({ open, message, type = "success", onClose }: AlertProps) {
    const getColor = () => {
        switch (type) {
            case "success":
                return "success";
            case "error":
                return "danger";
            case "warning":
                return "warning";
        }
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            color={getColor()}
            variant="solid"
            onClose={onClose}
        >
            {message}
        </Snackbar>
    );
}

export interface AlertProviderProps {
    children: React.ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<AlertType>("success");

    const showMessage = (message: string, type: AlertType = "success") => {
        setMessage(message);
        setType(type);
        setOpen(true);
    };

    const closeAlert = () => {
        setOpen(false);
    }

    useEffect(() => {

    }, []);
    return (
        <AlertContext.Provider value={{ showMessage }}>
            <Alert open={open} message={message} type={type} onClose={closeAlert} />
            {children}
        </AlertContext.Provider>
    );
}

export function useAlert(): AlertController {
    return useContext(AlertContext);
}

export default Alert;