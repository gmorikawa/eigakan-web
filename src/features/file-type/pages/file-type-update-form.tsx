import { usePageMetadata } from "@layout/page";
import { useParams } from "@hooks/params";

import { useFileTypeFormController } from "@features/file-type/hooks/file-type-form-controller";

import { Button } from "@components/input/button";
import { Container } from "@/components/container/container";
import { Form } from "@components/form/form";
import { Stack } from "@components/container/stack";
import { TextField } from "@components/form/text-field";

export function FileTypeUpdateFormPage() {
    usePageMetadata({ title: "Update File Type" });
    const { id } = useParams();

    const controller = useFileTypeFormController({
        defaultValues: {
            id: id,
            name: "",
            extension: "",
            mimeType: "",
        }
    });

    return (
        <Container>
            <Form onSubmit={controller.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        property="name"
                        value={controller.entity.name}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("name")}
                    />

                    <TextField
                        label="Extension"
                        property="extension"
                        value={controller.entity.extension}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("extension")}
                    />

                    <TextField
                        label="MIME Type"
                        property="mimeType"
                        value={controller.entity.mimeType}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("mimeType")}
                    />

                    <Container>
                        <Stack spacing={2} direction="row">
                            <Button type="submit">
                                Update
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

export default FileTypeUpdateFormPage;
