import type { UserRole } from "./user-role";
import type { UserStatus } from "./user-status";

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}