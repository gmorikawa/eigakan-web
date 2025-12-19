import { useUsers } from "@features/user/hooks/users";

import Container from "@/components/container/container";

export function UserListPage() {
    const users = useUsers();

    return (
        <Container>
            {users.data.map((user) => (
                <div key={user.id}>{user.fullname}</div>
            ))}
        </Container>
    );
}

export default UserListPage;