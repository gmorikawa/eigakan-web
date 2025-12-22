import Chip from "@components/data/chip";

export class UserRoleUtils {
    private static list = [
        { key: "ADMIN", label: "Administrator", chip: <Chip label="admin" color="danger" /> },
        { key: "EDITOR", label: "Editor", chip: <Chip label="editor" color="success" /> },
        { key: "VIEWER", label: "Viewer", chip: <Chip label="viewer" color="primary" /> },
    ];

    public static getList() {
        return this.list;
    }

    public static getLabel(role: string) {
        const roleItem = this.list.find((item) => item.key === role);
        return roleItem ? roleItem.label : "Unknown";
    }

    public static getChip(role: string) {
        const roleItem = this.list.find((item) => item.key === role);
        return roleItem ? roleItem.chip : <Chip label="Unknown" color="neutral" />;
    }
}