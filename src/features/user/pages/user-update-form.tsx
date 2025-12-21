import { useTitle } from "@hooks/title";
import { useParams } from "@hooks/params";

import { UserRoleUtils } from "@features/user/utils/user-role";
import { useUserFormController } from "@features/user/hooks/user-form-controller";

import Button from "@components/input/button";
import Container from "@/components/container/container";
import Form from "@components/form/form";
import Stack from "@components/container/stack";
import TextField from "@components/form/text-field";
import RadioField from "@components/form/radio-field";

export function UserUpdateFormPage() {
    useTitle("Update User");
    const { id } = useParams();

    const form = useUserFormController({
        defaultValues: {
            id: id,
            username: "",
            fullname: "",
            password: "",
            email: "",
            role: "VIEWER",
            status: "ACTIVE",
        }
    });

    return (
        <Container>
            <Form onSubmit={form.handleSubmit}>
                <Stack spacing={2}>
                    <RadioField label="Role" property="role" options={UserRoleUtils.getList().filter((item) => item.key !== "ADMIN").map((item) => ({ label: item.label, value: item.key }))} value={form.entity.role} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Full Name" property="fullname" value={form.entity.fullname} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Username" property="username" value={form.entity.username} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Email" property="email" value={form.entity.email} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />

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

export default UserUpdateFormPage;