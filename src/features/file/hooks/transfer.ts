import Environment from "@config/environment";

import { useSession } from "@features/auth/hooks/session";
import type { File } from "@features/file/types/entity";
import type { BinaryFile } from "@features/file/types/binary";

export interface FileTransferController {
    upload(file: File, binary: BinaryFile): Promise<void>;
    download(file: File): Promise<Blob>;
}

export function useFileTransfer() {
    const session = useSession();

    const upload = async (file: File, binary: BinaryFile) => {
        if (!session?.token) {
            throw new Error("User is not authenticated");
        }

        const formData = new FormData();
        formData.append("file", binary);

        const response = await fetch(Environment.API_URL.concat(`/files/${file.id}/upload`), {
            method: "POST",
            headers: {
                Authorization: session.token,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "File upload failed");
        }
    };

    const download = async (file: File) => {
        if (!session?.token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(Environment.API_URL.concat(`/files/${file.id}/download`), {
            method: "GET",
            headers: {
                Authorization: session.token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "File download failed");
        }

        return response.blob();
    };

    return { upload, download };
}