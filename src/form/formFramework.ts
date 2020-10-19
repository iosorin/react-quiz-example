export function createControl(config: FFormConfigType, validation: FFormValidationType) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    };
}

export function validate(value: string, validation: FFormValidationType = null) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
        isValid = /^\S+@\S+\.\S{2,3}$/.test(value) && isValid;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
}

export function validateForm(formControls: FFormControlsType) {
    let isFormValid = true;

    Object.keys(formControls).forEach((controlName) => {
        isFormValid = formControls[controlName].valid && isFormValid;
    });

    return isFormValid;
}

type FFormConfigType = {
    label: string;
    errorMessage: string;
    type?: string;
    id?: number;
};

type FFormValidationType = {
    required?: boolean;
    email?: boolean;
    minLength?: number;
} | null;

type FFormControlsType = {
    [key: string]: {
        validation: FFormValidationType;
        valid: boolean;
        touched: boolean;
        value: string;
    };
};
