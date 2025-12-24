import z from "zod";
import { UserStatusUtils } from "./user-status";
import { UserRoleUtils } from "./user-role";

export const userValidatorSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(UserRoleUtils.getList().map((role) => role.key)),
    status: z.enum(UserStatusUtils.getList().map((status) => status.key)),
    fullname: z.string().min(1, "Full name is required"),
});