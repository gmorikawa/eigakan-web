import { usePageMetadata } from "@layout/page";

import { useUserListController } from "@features/user/hooks/user-list-controller";

import Container from "@/components/container/container";
import UserTable from "@features/user/components/user-table";
import Button from "@components/input/button";

export function UserListPage() {
    usePageMetadata({ title: "User List" });
    const users = useUserListController();

    return (
        <Container>
            <Button onClick={users.handleCreate}>
                Create New User
            </Button>

            <UserTable
                users={users.data}
                onUpdate={users.handleUpdate}
                onRemove={users.handleRemove}
            />
        </Container>
    );
}

export default UserListPage;