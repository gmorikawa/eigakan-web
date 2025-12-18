import { useNavigate } from "@tanstack/react-router";

export interface Navigation {
    to: (path: string) => void;
}

export function useNavigator(): Navigation {
    const navigate = useNavigate();

    function to(path: string) {
        navigate({ to: path });
    }

    return {
        to,
    };
}

export default useNavigator;