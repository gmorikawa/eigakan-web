import Form from "@components/form/form";
import Stack from "@components/container/stack";
import RadioField from "@components/form/radio-field";
import TextField from "@components/form/text-field";
import PasswordField from "@components/form/password-field";
import Container from "@components/container/container";
import Button from "@components/input/button";

export interface UserForm {
    onSubmit: () => void;
}

export function UserForm() {
    return (
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
    );
}