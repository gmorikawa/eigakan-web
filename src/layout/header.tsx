import Header from "@components/container/header";
import { Divider, Typography } from "@mui/joy";
import { PageContext } from "./page";
import { useContext } from "react";

export interface PageHeaderProps {

}

export function PageHeader({}: PageHeaderProps) {
    const page = useContext(PageContext);
    
    return (
        <Header mb={2}>
            <Typography level="h1" fontSize="xl2" fontWeight="bold" pb={4}>
                {page.title}
            </Typography>

            <Divider orientation="horizontal" sx={{ marginLeft: -4, marginRight: -4 }} />
        </Header>
    );
}