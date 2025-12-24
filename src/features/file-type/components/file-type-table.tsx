import { RemoveIcon, UpdateIcon } from "@/shared/icons";

import Stack from "@components/container/stack";
import Table from "@components/data/table";
import IconButton from "@components/input/icon-button";

import type { FileType } from "@features/file-type/types/entity";

export interface FileTypeTableProps {
    fileTypes: FileType[];

    onUpdate?: (fileType: FileType) => void;
    onRemove?: (fileType: FileType) => void;
}

export function FileTypeTable({ fileTypes, onUpdate, onRemove }: FileTypeTableProps) {

    const update = (fileType: FileType) => {
        onUpdate?.(fileType);
    };

    const remove = (fileType: FileType) => {
        onRemove?.(fileType);
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Actions
                    </th>
                    <th style={{ width: "30%" }}>Name</th>
                    <th style={{ width: "20%" }}>Extension</th>
                    <th style={{ width: "40%" }}>MIME Type</th>
                </tr>
            </thead>

            <tbody>
                {fileTypes.map((fileType) => (
                    <tr key={fileType.id}>
                        <td>
                            <Stack direction="row">
                                <IconButton onClick={() => update(fileType)}><UpdateIcon /></IconButton>
                                <IconButton onClick={() => remove(fileType)} palette="danger"><RemoveIcon /></IconButton>
                            </Stack>
                        </td>
                        <td>{fileType.name}</td>
                        <td>{fileType.extension}</td>
                        <td>{fileType.mimeType}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default FileTypeTable;
