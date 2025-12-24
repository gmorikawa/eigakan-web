import type { ID } from "@shared/types/id";

export interface FileType {
    id: ID;
    name: string;
    extension: Extension;
    mimeType: MimeType;
}

export type NewFileType = Omit<FileType, "id">;
export type Extension = string;
export type MimeType = string;
