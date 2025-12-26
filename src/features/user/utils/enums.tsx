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

export class UserStatusUtils {
    private static list = [
        { key: "ACTIVE", label: "Active", chip: <Chip label="active" color="success" /> },
        { key: "BLOCKED", label: "Blocked", chip: <Chip label="blocked" color="danger" /> },
    ];

    public static getList() {
        return this.list;
    }

    public static getLabel(status: string) {
        const statusItem = this.list.find((item) => item.key === status);
        return statusItem ? statusItem.label : "Unknown";
    }

    public static getChip(status: string) {
        const statusItem = this.list.find((item) => item.key === status);
        return statusItem ? statusItem.chip : <Chip label="Unknown" color="neutral" />;
    }
}