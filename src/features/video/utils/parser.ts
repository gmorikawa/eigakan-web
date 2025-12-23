import { parseDate } from "@shared/utils/date";
import type { SerializedVideo, Video } from "../types/entity";

export function parseVideo(serialized: SerializedVideo): Video {
    return {
        id: serialized.id,
        title: serialized.title,
        description: serialized.description,
        releasedAt: serialized.releasedAt ? parseDate(serialized.releasedAt) : null,
        file: serialized.file,
        language: serialized.language,
        tags: serialized.tags,
    };
}

export function parseVideoArray(data: SerializedVideo[]): Video[] {
    return data.map(parseVideo);
}
