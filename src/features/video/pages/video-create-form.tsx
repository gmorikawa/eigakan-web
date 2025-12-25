import { usePageMetadata } from "@layout/page";

import { useLanguageListController } from "@features/language/hooks/language-list-controller";
import { useVideoFormController } from "@features/video/hooks/video-form-controller";

import { Button } from "@components/input/button";
import { ComboField } from "@components/form/combo-field";
import { Container } from "@/components/container/container";
import { DateField } from "@components/form/date-field";
import { FileField } from "@components/form/file-field";
import { Form } from "@components/form/form";
import { Stack } from "@components/container/stack";
import { TextField } from "@components/form/text-field";

export function VideoCreateFormPage() {
    usePageMetadata({ title: "Create Video" });

    const languages = useLanguageListController();

    const controller = useVideoFormController({
        defaultValues: {
            title: "",
            description: "",
            releasedAt: null,
            language: null,
            tags: []
        },
    });

    return (
        <Container>
            <Form onSubmit={controller.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        property="title"
                        value={controller.entity.title}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("title")}
                    />

                    <TextField
                        label="Description"
                        property="description"
                        value={controller.entity.description}
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("description")}
                    />

                    <DateField
                        label="Released At"
                        property="releasedAt"
                        value={controller.entity.releasedAt}
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("releasedAt")}
                    />

                    <ComboField
                        label="Language"
                        property="language"
                        value={controller.entity.language}
                        fullWidth
                        options={languages.data}
                        optionKey="id"
                        optionLabel="name"
                        onChange={controller.handleChange}
                        error={controller.getError("language")}
                    />

                    <TextField
                        label="Tags"
                        property="tags"
                        value={controller.entity.tags?.join(", ")}
                        fullWidth
                        onChange={(property: string, value: string) => controller.handleChange(property, value.split(",").map(tag => tag.trim()))}
                        onBlur={(property: string, value: string) => controller.handleBlur(property, value.split(",").map(tag => tag.trim()))}
                        error={controller.getError("tags")}
                    />

                    <FileField
                        label="File"
                        property="file"
                        fullWidth
                        onChange={controller.handleFileChange}
                    />

                    <Container>
                        <Stack spacing={2} direction="row">
                            <Button type="submit">
                                Create
                            </Button>

                            <Button type="button" variant="outlined" onClick={controller.handleBack}>
                                Cancel
                            </Button>
                        </Stack>
                    </Container>
                </Stack>
            </Form>
        </Container>
    );
}

export default VideoCreateFormPage;