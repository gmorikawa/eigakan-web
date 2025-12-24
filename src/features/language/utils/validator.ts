import z from "zod";

export const languageValidatorSchema = z.object({
    name: z.string().min(1, "Username is required"),
    code: z.string().min(1, "Language code is required"),
});