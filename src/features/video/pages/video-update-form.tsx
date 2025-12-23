import { useTitle } from "@hooks/title";
import { useParams } from "@hooks/params";

import { useLanguageListController } from "@features/language/hooks/language-list-controller";
import { useVideoFormController } from "@features/video/hooks/video-form-controller";

import { Button } from "@components/input/button";
import { Container } from "@/components/container/container";
import { Form } from "@components/form/form";
import { Stack } from "@components/container/stack";
import { TextField } from "@components/form/text-field";
import { DateField } from "@components/form/date-field";
import { ComboField } from "@components/form/combo-field";

export function VideoUpdateFormPage() {
    useTitle("Update Video");
    const { id } = useParams();

    const languages = useLanguageListController();

    const form = useVideoFormController({
        defaultValues: {
            id: id,
            title: "",
            description: "",
            releasedAt: null,
            language: null,
            tags: []
        }
    });

    return (
        <Container>
            <Form onSubmit={form.handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Title" property="title" value={form.entity.title} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Description" property="description" value={form.entity.description} fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <DateField label="Released At" property="releasedAt" value={form.entity.releasedAt} fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <ComboField label="Language" property="language" value={form.entity.language} fullWidth options={languages.data} optionKey="id" optionLabel="name" onChange={form.handleChange} />
                    <TextField
                        label="Tags"
                        property="tags"
                        value={form.entity.tags?.join(", ")}
                        fullWidth
                        onChange={(property: string, value: string) => form.handleChange(property, value.split(",").map(tag => tag.trim()))}
                        onBlur={(property: string, value: string) => form.handleBlur(property, value.split(",").map(tag => tag.trim()))}
                    />

                    <Container>
                        <Stack spacing={2} direction="row">
                            <Button type="submit">
                                Update
                            </Button>

                            <Button type="button" variant="outlined" onClick={form.handleBack}>
                                Cancel
                            </Button>
                        </Stack>
                    </Container>
                </Stack>
            </Form>
        </Container>
    );
}

export default VideoUpdateFormPage;