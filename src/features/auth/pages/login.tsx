import Button from "@/components/input/button";
import Container from "@/components/container/container";
import Form from "@/components/form/form";
import Stack from "@/components/container/stack";

import { Checkbox, FormControl, FormLabel, Input, Link } from "@mui/joy";
import { useAuthentication } from "@/features/auth/hooks/use-authentication";

export function LoginPage() {
    const { login } = useAuthentication();

    return (
        <Container maxWidth="100%" width="400px">
            <Form
                onSubmit={(event: React.FormEvent<any>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;
                    const data = {
                        email: formElements.email.value,
                        password: formElements.password.value,
                        persistent: formElements.persistent.checked,
                    };
                    alert(JSON.stringify(data, null, 2));

                    login(data.email, data.password)
                        .catch((error) => {
                            console.error("Login failed:", error);
                        });
                }}
            >
                <Stack spacing={2}>
                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" name="email" />
                    </FormControl>

                    <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" />
                    </FormControl>

                    <Stack spacing={4}>
                        <Container
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Checkbox size="sm" label="Remember me" name="persistent" />
                            <Link level="title-sm" href="#replace-with-a-link">
                                Forgot your password?
                            </Link>
                        </Container>
                        <Button type="submit" fullWidth>
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </Form>
        </Container>
    );
}

export default LoginPage;