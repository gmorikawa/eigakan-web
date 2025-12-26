import { RemoveIcon, UpdateIcon } from "@/shared/icons";

import Stack from "@components/container/stack";
import Table from "@components/data/table";
import IconButton from "@components/input/icon-button";

import type { User } from "@features/user/types/entity";
import { UserRoleUtils } from "@features/user/utils/enums";
import { UserStatusUtils } from "@features/user/utils/enums";

export interface UserTableProps {
    users: User[];

    onUpdate?: (user: User) => void;
    onRemove?: (user: User) => void;
}

export function UserTable({ users, onUpdate, onRemove }: UserTableProps) {

    const update = (user: User) => {
        onUpdate?.(user);
    };

    const remove = (user: User) => {
        onRemove?.(user);
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Actions
                    </th>
                    <th>Full Name</th>
                    <th style={{ width: "20%" }}>Username</th>
                    <th style={{ width: "30%" }}>Email</th>
                    <th style={{ width: "10%" }}>Role</th>
                    <th style={{ width: "10%" }}>Status</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <Stack direction="row">
                                <IconButton onClick={() => update(user)}><UpdateIcon /></IconButton>
                                <IconButton onClick={() => remove(user)} palette="danger"><RemoveIcon /></IconButton>
                            </Stack>
                        </td>
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