export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    };
}

export function validate(value, validation = null) {
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

export function validateForm(formControls) {
    let isFormValid = true;

    Object.keys(formControls).forEach((controlName) => {
        isFormValid = formControls[controlName].valid && isFormValid;
    });

    return isFormValid;
}
