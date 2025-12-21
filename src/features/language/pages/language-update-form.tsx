import { useNavigator } from "@hooks/navigator";
import { useParams } from "@hooks/params";

import { useLanguageFormController } from "@features/language/hooks/language-form-controller";

import { Button } from "@components/input/button";
import { Container } from "@/components/container/container";
import { Form } from "@components/form/form";
import { Stack } from "@components/container/stack";
import { TextField } from "@components/form/text-field";

export function LanguageUpdateFormPage() {
    const navigate = useNavigator();
    const { id } = useParams();

    const form = useLanguageFormController({
        defaultValues: {
            id: id,
            name: "",
            code: "",
        },
        onSuccess: () => {
            handleBack();
        }
    });

    const handleBack = () => {
        navigate.to("/admin/language/list");
    };

    return (
        <Container>
            <Form onSubmit={form.handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Language" property="name" value={form.entity.name} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="ISO Code" property="code" value={form.entity.code} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />

                    <Container>
                        <Stack spacing={2} direction="row">
                            <Button type="submit">
                                Create
                            </Button>

                            <Button type="button" variant="outlined" onClick={handleBack}>
                                Cancel
                            </Button>
                        </Stack>
                    </Container>
                </Stack>
            </Form>
        </Container>
    );
}

export default LanguageUpdateFormPage;