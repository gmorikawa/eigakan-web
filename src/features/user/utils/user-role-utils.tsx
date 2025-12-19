import Chip from "@components/data/chip";

export class UserRoleUtils {
    private static list = [
        { key: "ADMIN", label: "Administrator", chip: <Chip label="Admin" color="danger" /> },
        { key: "CREATOR", label: "Creator", chip: <Chip label="Creator" color="success" /> },
        { key: "VIEWER", label: "Viewer", chip: <Chip label="Viewer" color="primary" /> },
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