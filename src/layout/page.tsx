import Environment from "@config/environment";
import { createContext, useContext, useEffect, useState } from "react";

export interface Page {
    title: string;
}

export interface PageController extends Page {
    setTitle: (title: string) => void;
}

export const PageContext = createContext<PageController>({ title: "", setTitle: () => {} });

export function usePageMetadata({ title }: Page) {
    const page = useContext(PageContext);

    useEffect(() => {
        document.title = `${title} | ${Environment.APPLICATION_NAME || "MyApp"}`;
        page.setTitle(title);
    }, [title]);
}

export interface PageMetadataProps extends React.PropsWithChildren { }

export function PageMetadata({ children }: PageMetadataProps) {
    const [title, setTitle] = useState("");

    return (
        <PageContext.Provider value={{ title, setTitle }}>
            {children}
        </PageContext.Provider>
    );
}