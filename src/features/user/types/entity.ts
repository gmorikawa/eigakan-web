import type { UserRole, UserStatus } from "@features/user/types/enums";

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