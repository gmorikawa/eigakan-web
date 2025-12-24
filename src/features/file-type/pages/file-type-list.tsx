import { usePageMetadata } from "@layout/page";

import { useFileTypeListController } from "@features/file-type/hooks/file-type-list-controller";

import FileTypeTable from "@features/file-type/components/file-type-table";
import Container from "@/components/container/container";
import Button from "@components/input/button";

export function FileTypeListPage() {
    usePageMetadata({ title: "File Type List" });

    const fileTypes = useFileTypeListController();

    return (
        <Container>
            <Button onClick={fileTypes.handleCreate}>
                Create New File Type
            </Button>

            <FileTypeTable
                fileTypes={fileTypes.data}
                onUpdate={fileTypes.handleUpdate}
                onRemove={fileTypes.handleRemove}
            />
        </Container>
    );
}

export default FileTypeListPage;
