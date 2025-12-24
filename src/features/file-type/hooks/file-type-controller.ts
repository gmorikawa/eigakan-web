import type { ID } from "@/shared/types/id";
import Environment from "@config/environment";

import { useSession } from "@features/auth/hooks/session";
import type { Session } from "@features/auth/types/session";
import type { NewFileType, FileType } from "@features/file-type/types/entity";

const getAllRequest = async (session: Session) => {
    const response = await fetch(Environment.API_URL.concat("/files/types"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get file types");
    }

    return response.json() as Promise<FileType[]>;
};

const getByIdRequest = async (session: Session, id: ID) => {
    const response = await fetch(Environment.API_URL.concat(`/files/types/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get file type");
    }

    return response.json() as Promise<FileType>;
};

const createRequest = async (session: Session, fileType: NewFileType) => {
    const response = await fetch(Environment.API_URL.concat("/files/types"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(fileType),
    });

    if (!response.ok) {
        throw new Error("Failed to create file type");
    }

    return response.json() as Promise<FileType>;
};

const updateRequest = async (session: Session, id: ID, fileType: Partial<FileType>) => {
    const response = await fetch(Environment.API_URL.concat(`/files/types/${id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
        body: JSON.stringify(fileType),
    });

    if (!response.ok) {
        throw new Error("Failed to update file type");
    }

    return response.json() as Promise<FileType>;
};

const removeRequest = async (session: Session, id: ID) => {
    const response = await fetch(Environment.API_URL.concat(`/files/types/${id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": session.token ?? "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to remove file type");
    }

    return response.json() as Promise<boolean>;
};

export interface FileTypeController {
    getAll(): Promise<FileType[]>;
    getById(id: ID): Promise<FileType>;
    create(fileType: NewFileType): Promise<FileType>;
    update(id: ID, fileType: FileType): Promise<FileType>;
    remove(id: ID): Promise<boolean>;
}

export function useFileTypeController(): FileTypeController {
    const session = useSession();

    const getAll = async (): Promise<FileType[]> => getAllRequest(session);
    const getById = async (id: ID): Promise<FileType> => getByIdRequest(session, id);
    const create = async (fileType: NewFileType): Promise<FileType> => createRequest(session, fileType);
    const update = async (id: ID, fileType: FileType): Promise<FileType> => updateRequest(session, id, fileType);
    const remove = async (id: ID): Promise<boolean> => removeRequest(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    }
}
