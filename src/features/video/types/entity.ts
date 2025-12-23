import type { ID } from "@shared/types/id.js";
import type { Language } from "@features/language/types/entity";
import type { File } from "@features/file/types/entity";
import type { ISODateString } from "@shared/types/date";

export interface Video {
    id: ID;
    title: string;
    description: string;
    releasedAt: Date | null;
    language: Language | null;
    file: File;
    tags: Tags;
}

export type NewVideo = Omit<Video, "id">;
export type Tags = string[];

export interface SerializedVideo {
    id: ID;
    title: string;
    description: string;
    releasedAt: ISODateString | null;
    language: Language | null;
    file: File;
    tags: Tags;
}
