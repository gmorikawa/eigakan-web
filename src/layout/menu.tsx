import { List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader } from "@mui/joy";
import { LanguageIcon, UserIcon } from "@/shared/icons";
import useNavigator from "@hooks/navigator";

interface MenuSectionProps {
    title?: string;
    children?: React.ReactNode;
}

function MenuSection({ title, children }: MenuSectionProps) {
    return (
        <ListItem nested>
            {title && <ListSubheader>{title}</ListSubheader>}
            {children}
        </ListItem>
    );
}

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    link: string;

    onClick?(link: string): void;
}

function MenuItem({ icon, label, link, onClick }: MenuItemProps) {
    const handleClick = (_: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(link);
    };

    return (
        <ListItemButton onClick={handleClick}>
            <ListItemDecorator>{icon}</ListItemDecorator>
            <ListItemContent>{label}</ListItemContent>
        </ListItemButton>
    );
}

interface MenuContainerProps {
    children?: React.ReactNode;
}

function MenuContainer({ children }: MenuContainerProps) {
    return (
        <List sx={{ height: "100%", width: 250 }}>
            {children}
        </List>
    );
}

export function Menu() {
    const navigate = useNavigator();

    const handleNavigate = (link: string) => {
        navigate.to(link);
    }

    return (
        <MenuContainer>
            <MenuSection title="System">
                <MenuItem icon={<UserIcon />} label="Users" link="/admin/user/list" onClick={handleNavigate} />
                <MenuItem icon={<LanguageIcon />} label="Languages" link="/admin/language/list" onClick={handleNavigate} />
            </MenuSection>
        </MenuContainer>
    );
}
