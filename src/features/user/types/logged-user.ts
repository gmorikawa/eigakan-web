import type { UserRole } from "@/features/user/types/user-role";
import type { UserStatus } from "@/features/user/types/user-status";

export interface LoggedUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    fullname: string;
}