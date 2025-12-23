import { usePageMetadata } from "@layout/page";

import { useLanguageListController } from "@features/language/hooks/language-list-controller";

import LanguageTable from "@features/language/components/language-table";
import Container from "@/components/container/container";
import Button from "@components/input/button";

export function LanguageListPage() {
    usePageMetadata({ title: "Language List" });

    const languages = useLanguageListController();

    return (
        <Container>
            <Button onClick={languages.handleCreate}>
                Create New Language
            </Button>

            <LanguageTable
                languages={languages.data}
                onUpdate={languages.handleUpdate}
                onRemove={languages.handleRemove}
            />
        </Container>
    );
}

export default LanguageListPage;