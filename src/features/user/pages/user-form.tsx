import useNavigator from "@hooks/use-navigator";
import { useUserForm } from "@features/user/hooks/user-form";

import Button from "@components/input/button";
import Container from "@/components/container/container";
import Form from "@components/form/form";
import PasswordField from "@components/form/password-field";
import Stack from "@components/container/stack";
import TextField from "@components/form/text-field";
import RadioField from "@components/form/radio-field";
import { UserRoleUtils } from "../utils/user-role-utils";

export function UserFormPage() {
    const navigate = useNavigator();

    const form = useUserForm({
        defaultValues: {
            username: "",
            fullname: "",
            password: "",
            email: "",
            role: "VIEWER",
            status: "ACTIVE",
        },
        onSuccess: () => {
            handleBack();
        }
    });

    const handleBack = () => {
        navigate.to("/admin/user/list");
    };

    return (
        <Container id="Teste">
            <Form onSubmit={form.handleSubmit}>
                <Stack spacing={2}>
                    <RadioField label="Role" property="role" options={UserRoleUtils.getList().filter((item) => item.key !== "ADMIN").map((item) => ({ label: item.label, value: item.key }))} value={form.user.role} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Full Name" property="fullname" value={form.user.fullname} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Username" property="username" value={form.user.username} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <TextField label="Email" property="email" value={form.user.email} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />
                    <PasswordField label="Password" property="password" value={form.user.password} required fullWidth onChange={form.handleChange} onBlur={form.handleBlur} />

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

export default UserFormPage;