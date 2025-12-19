import { useNavigate } from "react-router";

export interface Navigation {
    to: (path: string) => void;
}

export function useNavigator(): Navigation {
    const navigate = useNavigate();

    const to = (path: string) => {
        navigate(path);
    }

    return {
        to
    };
}

export default useNavigator;