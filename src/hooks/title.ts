import Environment from "@config/environment";

export function useTitle(title: string) {
    document.title = `${title} | ${Environment.APPLICATION_NAME}`;
}

export default useTitle;