import type { ID } from "@/shared/types/id";
import Environment from "@config/environment";

import type { Session } from "@features/auth/types/session";
import type { NewFileType, FileType } from "@features/file-type/types/entity";

export async function getAllFileTypes(session: Session): Promise<FileType[]> {
    const response = await fetch(Environment.API_URL.concat("/files/types"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<FileType[]>;
};

export async function getFileTypeById(session: Session, id: ID): Promise<FileType> {
    const response = await fetch(Environment.API_URL.concat(`/files/types/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<FileType>;
};

export async function createFileType(session: Session, fileType: NewFileType): Promise<FileType> {
    const response = await fetch(Environment.API_URL.concat("/files/types"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(fileType),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<FileType>;
};

export async function updateFileType(session: Session, id: ID, fileType: Partial<FileType>): Promise<FileType> {
    const response = await fetch(Environment.API_URL.concat(`/files/types/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(fileType),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<FileType>;
};

export async function removeFileType(session: Session, id: ID): Promise<boolean> {
    const response = await fetch(Environment.API_URL.concat(`/files/types/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json() as Promise<boolean>;
};
