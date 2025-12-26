import { useEffect, useState } from "react";
import useNavigator from "@hooks/navigator";

import { useAlert } from "@components/feedback/alert";

import type { FileType } from "@features/file-type/types/entity";
import { useFileTypeController, type FileTypeController } from "@features/file-type/hooks/file-type-controller";

export interface FileTypeListController extends FileTypeController {
    data: FileType[];
    refresh(): Promise<void>;

    handleCreate(): void;
    handleUpdate(fileType: FileType): void;
    handleRemove(fileType: FileType): void;
}

export function useFileTypeListController(): FileTypeListController {
    const controller = useFileTypeController();
    const navigate = useNavigator();
    const alert = useAlert();
    const [data, setData] = useState<FileType[]>([]);

    const loadData = async () => {
        return controller.getAll()
            .then(async (fileTypes: FileType[]) => {
                setData(fileTypes);
            })
            .catch((error: Error) => {
                alert.showMessage(`Error loading file types: ${error.message}`, "error");
            });
    };

    const refresh = async () => {
        await loadData();
    };

    const handleCreate = () => {
        navigate.to("/admin/file-type/form");
    };

    const handleUpdate = (fileType: FileType) => {
        navigate.to(`/admin/file-type/form/${fileType.id}`);
    };

    const handleRemove = async (fileType: FileType) => {
        controller.remove(fileType.id)
            .then(async (_: boolean) => {
                refresh();
            })
            .catch((error: Error) => {
                alert.showMessage(`Error removing file type: ${error.message}`, "error");
            });
    };

    useEffect(() => {
        loadData();
    }, []);
    return { 
        data,
        refresh,
        handleRemove,
        handleCreate,
        handleUpdate,
        ...controller
    };
}
