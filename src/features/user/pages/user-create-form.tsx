import { usePageMetadata } from "@layout/page";

import { UserRoleUtils } from "@features/user/utils/enums";
import { useUserFormController } from "@features/user/hooks/user-form-controller";

import { Button } from "@components/input/button";
import { Container } from "@/components/container/container";
import { Form } from "@components/form/form";
import { PasswordField } from "@components/form/password-field";
import { Stack } from "@components/container/stack";
import { TextField } from "@components/form/text-field";
import { RadioField } from "@components/form/radio-field";

export function UserCreateFormPage() {
    usePageMetadata({ title: "Create User" });

    const controller = useUserFormController({
        defaultValues: {
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
            <Form onSubmit={controller.handleSubmit}>
                <Stack spacing={2}>
                    <RadioField
                        label="Role"
                        property="role"
                        options={UserRoleUtils.getList().filter((item) => item.key !== "ADMIN").map((item) => ({ label: item.label, value: item.key }))}
                        value={controller.entity.role}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("role")}
                    />

                    <TextField
                        label="Full Name"
                        property="fullname"
                        value={controller.entity.fullname}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("fullname")}
                    />

                    <TextField
                        label="Username"
                        property="username"
                        value={controller.entity.username}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("username")}
                    />

                    <TextField
                        label="Email"
                        property="email"
                        value={controller.entity.email}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("email")}
                    />

                    <PasswordField
                        label="Password"
                        property="password"
                        value={controller.entity.password}
                        required
                        fullWidth
                        onChange={controller.handleChange}
                        onBlur={controller.handleBlur}
                        error={controller.getError("password")}
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

export default UserCreateFormPage;