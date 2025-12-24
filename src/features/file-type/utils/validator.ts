import z from "zod";

export const fileTypeValidatorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    extension: z.string().min(1, "Extension is required"),
    mimeType: z.string().min(1, "MIME type is required"),
});
