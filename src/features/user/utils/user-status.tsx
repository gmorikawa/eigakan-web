import Chip from "@components/data/chip";

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