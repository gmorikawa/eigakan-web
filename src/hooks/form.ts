import { flattenObject, substituteValue } from "@shared/utils/object";
import { useEffect, useState } from "react";

type ZodIssue = {
    code: string;
    inclusive: boolean;
    message: string;
    origin: string;
    path: string[]
}

export interface FormController<T> {
    entity: Partial<T>;
    isValid: boolean;

    errors: Record<string, string> | null;
    touched: Record<string, boolean>;
    getError: (key: string) => string;

    updateEntity: (entity: Partial<T>) => void;
    makeAllTouched: () => void;

    handleChange: (field: string, value: any) => void;
    handleBlur: (field: string, value: any) => void;
    handleSubmit: () => void;
}

export interface FormConfiguration<T extends Object> {
    defaultValues: Partial<T>;
    schema: any;
    onSubmit: () => void;
}

export function useForm<T extends Object>(config: FormConfiguration<T>) {
    const [entity, setEntity] = useState<Partial<T>>(config.defaultValues);
    const [errors, setErrors] = useState<Record<string, any> | null>(null);
    const [touched, setTouched] = useState<Record<string, boolean>>(
        substituteValue(flattenObject<Partial<T>>(config.defaultValues), false)
    );
    const isValid = !Boolean(errors);

    const validate = async () => {
        const result = await config.schema.safeParse(entity);

        if (result.error) {
            const newErrors = {} as Record<string, string>;
            result.error.issues.forEach((issue: ZodIssue) => {
                newErrors[issue.path.join(".")] = issue.message;
            });

            setErrors(newErrors);
        } else {
            setErrors(null);
        }

        return !Boolean(result.error);
    };

    const getError = (key: string) => {
        return (touched[key] && errors && errors[key]) || "";
    };

    const addTouched = (key: string) => {
        setTouched((previousTouched: Record<string, boolean>) => ({
            ...previousTouched,
            [key]: true,
        }));
    };

    const updateEntity = (newEntity: Partial<T>) => {
        setEntity(newEntity);
    };

    const makeAllTouched = () => {
        setTouched(substituteValue(flattenObject<Partial<T>>(entity), true));
    };

    const handleChange = (field: string, value: any) => {
        setEntity((previousEntity: Partial<T>) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleBlur = (field: string, value: any) => {
        addTouched(field);
        setEntity((previousEntity: Partial<T>) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        makeAllTouched();

        if (!isValid) {
            return;
        }

        config.onSubmit();
    };

    useEffect(() => {
        validate();
    }, [entity]);
    return {
        entity,
        isValid,

        errors,
        touched,
        getError,

        updateEntity,
        makeAllTouched,

        handleChange,
        handleBlur,
        handleSubmit
    };
}