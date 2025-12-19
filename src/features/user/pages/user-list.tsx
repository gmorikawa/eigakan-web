import { useUsers } from "@features/user/hooks/users";

import Container from "@/components/container/container";
import UserTable from "../components/user-table";

export function UserListPage() {
    const users = useUsers();

    return (
        <Container>
            <UserTable users={users.data} />
        </Container>
    );
}

export default UserListPage;