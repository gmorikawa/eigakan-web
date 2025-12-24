import z from "zod";

export const videoValidatorSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    releasedAt: z.date().nullable().optional(),
    language: z.object({}).optional().nullable(),
    file: z.object({}).optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
});