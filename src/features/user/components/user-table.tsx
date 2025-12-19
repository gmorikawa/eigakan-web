import Table from "@components/data/table";

import type { User } from "@features/user/types/entity";
import { UserRoleUtils } from "@features/user/utils/user-role-utils";
import { UserStatusUtils } from "@features/user/utils/user-status-utils";

export interface UserTableProps {
    users: User[];
}

export function UserTable({ users }: UserTableProps) {
    return (
        <Table>
            <thead>
                <tr>
                    <th style={{ width: "30%" }}>Full Name</th>
                    <th style={{ width: "20%" }}>Username</th>
                    <th style={{ width: "30%" }}>Email</th>
                    <th style={{ width: "10%" }}>Role</th>
                    <th style={{ width: "10%" }}>Status</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.fullname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{UserRoleUtils.getChip(user.role)}</td>
                        <td>{UserStatusUtils.getChip(user.status)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserTable;