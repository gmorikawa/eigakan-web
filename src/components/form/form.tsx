export interface FormProps extends React.PropsWithChildren {
    fullHeight?: boolean;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export function Form({ fullHeight = false, onSubmit, children }: FormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(event);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "block", height: fullHeight ? "100%" : "auto" }}>
            {children}
        </form>
    );
}

export default Form;