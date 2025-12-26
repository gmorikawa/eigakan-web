import type { ID } from "@shared/types/id";

import { useSession } from "@features/auth/hooks/session";
import type { NewUser, User } from "@features/user/types/entity";
import { createUser, getAllUsers, getUserById, removeUser, updateUser } from "../utils/api";

export interface UserController {
    getAll(): Promise<User[]>;
    getById(id: ID): Promise<User>;
    create(user: NewUser): Promise<User>;
    update(id: ID, user: User): Promise<User>;
    remove(id: ID): Promise<boolean>;
}

export function useUserController(): UserController {
    const session = useSession();

    const getAll = (): Promise<User[]> => getAllUsers(session);
    const getById = (id: ID): Promise<User> => getUserById(session, id);
    const create = (user: NewUser): Promise<User> => createUser(session, user);
    const update = (id: ID, user: User): Promise<User> => updateUser(session, id, user);
    const remove = (id: ID): Promise<boolean> => removeUser(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    }
}