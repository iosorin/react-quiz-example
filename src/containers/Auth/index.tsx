import React, { FC, FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';
import { auth } from '@/store/actions/auth';
import { createControl, validate, validateForm } from '@/utils/form';

import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';

const Auth: FC = () => {
    const dispatch = useDispatch();

    const [isFormValid, setIsFormValid] = useState(false);

    const [formControls, setFormContols] = useState({
        email: createControl(
            {
                type: 'email',
                label: 'Email',
            },
            { required: true, email: true }
        ),
        password: createControl(
            {
                type: 'password',
                label: 'Password',
            },
            { required: true, minLength: 5 }
        ),
    });

    function onChangeHandler(e: FormEvent<HTMLInputElement>, controlName: keyof typeof formControls) {
        const updatedFormControls = { ...formControls };
        const control = { ...updatedFormControls[controlName] };

        control.touched = true;
        control.value = e.currentTarget.value;

        const { valid, errorMessage } = validate(control.value, control.validation);

        control.valid = valid;
        control.errorMessage = errorMessage;

        updatedFormControls[controlName] = control;

        const isFormValid = validateForm(updatedFormControls);

        setIsFormValid(isFormValid);
        setFormContols(updatedFormControls);
    }

    function loginHandler() {
        const { email, password } = formControls;

        dispatch(auth(email.value, password.value, true));
    }

    function registerHandler() {
        const { email, password } = formControls;

        dispatch(auth(email.value, password.value, false));
    }

    function renderInput() {
        return Object.keys(formControls).map((controlName: string, index) => {
            const control = formControls[controlName as keyof typeof formControls];

            return (
                <Input
                    errorMessage={control.errorMessage}
                    key={controlName + index}
                    label={control.label}
                    onChange={(e) => onChangeHandler(e, controlName as keyof typeof formControls)}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    type={control.type}
                    valid={control.valid}
                    value={control.value}
                />
            );
        });
    }

    return (
        <div className="container">
            <h1>Authorization</h1>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
                {renderInput()}

                <Button disabled={!isFormValid} onClick={loginHandler} type="success">
                    Sign in
                </Button>

                <Button disabled={!isFormValid} onClick={registerHandler} type="primary">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Auth;
