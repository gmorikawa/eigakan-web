import { useUsers } from "@features/user/hooks/users";

import Container from "@/components/container/container";
import UserTable from "@features/user/components/user-table";
import Button from "@components/input/button";
import useNavigator from "@hooks/use-navigator";

export function UserListPage() {
    const navigate = useNavigator();
    const users = useUsers();

    const handleCreate = () => {
        navigate.to("/admin/user/form");
    };

    return (
        <Container>
            <Button onClick={handleCreate}>
                Create New User
            </Button>

            <UserTable users={users.data} />
        </Container>
    );
}

export default UserListPage;