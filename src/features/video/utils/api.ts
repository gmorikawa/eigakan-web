import type { ID } from "@shared/types/id";

import Environment from "@config/environment";

import type { Session } from "@features/auth/types/session";
import type { NewVideo, Video } from "@features/video/types/entity";
import { parseVideo, parseVideoArray } from "@features/video/utils/parser";

export async function getAllVideos(session: Session) {
    const response = await fetch(Environment.API_URL.concat("/videos"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get videos");
    }

    const data = await response.json();
    return parseVideoArray(data);
}

export async function getVideoById(session: Session, id: ID) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get video");
    }

    const data = await response.json();
    return parseVideo(data);
}

export async function createVideo(session: Session, video: NewVideo) {
    const response = await fetch(Environment.API_URL.concat("/videos"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(video),
    });

    if (!response.ok) {
        throw new Error("Failed to create video");
    }

    const data = await response.json();
    return parseVideo(data);
};

export async function updateVideo(session: Session, id: ID, video: Video) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(video),
    });

    if (!response.ok) {
        throw new Error("Failed to update video");
    }

    const data = await response.json();
    return parseVideo(data);
};

export async function deleteVideo(session: Session, id: ID) {
    const response = await fetch(Environment.API_URL.concat(`/videos/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete video");
    }

    return true;
};