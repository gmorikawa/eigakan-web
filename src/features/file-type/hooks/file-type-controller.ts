import type { ID } from "@/shared/types/id";

import { useSession } from "@features/auth/hooks/session";
import type { NewFileType, FileType } from "@features/file-type/types/entity";
import { createFileType, getAllFileTypes, getFileTypeById, removeFileType, updateFileType } from "@features/file-type/utils/api";


export interface FileTypeController {
    getAll(): Promise<FileType[]>;
    getById(id: ID): Promise<FileType>;
    create(fileType: NewFileType): Promise<FileType>;
    update(id: ID, fileType: FileType): Promise<FileType>;
    remove(id: ID): Promise<boolean>;
}

export function useFileTypeController(): FileTypeController {
    const session = useSession();

    const getAll = async (): Promise<FileType[]> => getAllFileTypes(session);
    const getById = async (id: ID): Promise<FileType> => getFileTypeById(session, id);
    const create = async (fileType: NewFileType): Promise<FileType> => createFileType(session, fileType);
    const update = async (id: ID, fileType: FileType): Promise<FileType> => updateFileType(session, id, fileType);
    const remove = async (id: ID): Promise<boolean> => removeFileType(session, id);

    return {
        getAll,
        getById,
        create,
        update,
        remove,
    }
}
