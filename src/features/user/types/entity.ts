import type { UserRole } from "@features/user/types/user-role";
import type { UserStatus } from "@features/user/types/user-status";

export interface NewUser {
    username: string;
    password: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}

export interface User extends NewUser{
    id: string;
}