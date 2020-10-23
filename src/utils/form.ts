const validators = {
    email: (value: string) => /^\w+@\w+\.\w{2,3}$/.test(value),
    required: (value: string) => value && value.trim().length,
    minLength: (value: string, minLength: number) => value && value.length >= minLength,
};

export function createControl(config: ConfigType, validation: ValidationType): CreateControlType {
    return {
        value: '',
        validation,
        valid: !validation,
        touched: false,
        errorMessage: config.errorMessage || '',
        ...config,
    };
}

export const validateForm = (formControls: { [key: string]: CreateControlType }) => {
    let isFormValid = true;

    Object.keys(formControls).forEach((controlName) => {
        isFormValid = formControls[controlName].valid && isFormValid;
    });

    return isFormValid;
};

export const validate = (
    value: string,
    validation: ValidationType = null
): { valid: boolean; errors: object; errorMessage: string } => {
    const result = {
        valid: true,
        errors: {} as { [key: string]: string | boolean },
        errorMessage: '',
    };

    if (!validation) return result;

    if (validation.required) {
        result.errors.required = !validators.required(value) && 'Field is required';
        result.valid = !result.errors.required && result.valid;
    }

    if (validation.email) {
        result.errors.email = !validators.email(value) && 'Invalid email address';
        result.valid = !result.errors.email && result.valid;
    }

    if (validation.minLength) {
        result.errors.minLength =
            !validators.minLength(value, validation.minLength) &&
            `Must be at least ${validation.minLength} characters long`;
        result.valid = !result.errors.minLength && result.valid;
    }

    const errorMessage = Object.keys(result.errors)
        .map((e) => result.errors[e])
        .filter((e) => e)[0];

    result.errorMessage = errorMessage ? String(errorMessage) : '';

    return result;
};

type ConfigType = {
    label: string;
    errorMessage?: string;
    type?: string;
    id?: number;
};

type ValidationType = {
    email?: boolean;
    required?: boolean;
    minLength?: number;
} | null;

type ValidationFlagsType = {
    validation: ValidationType;
    valid: boolean;
    touched: boolean;
    value: string;
};

export type CreateControlType = ConfigType & ValidationType & ValidationFlagsType;

/* custom form framework example */
