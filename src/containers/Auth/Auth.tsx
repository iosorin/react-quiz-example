import React, { FC, FormEvent, useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { auth } from '@/redux/actions/auth';
import { createControl, validate, validateForm } from '@/form/formFramework';

import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';

import classes from './Auth.module.scss';

const Auth: FC<PropsFromRedux> = (props) => {
    const [isFormValid, setIsFormValid] = useState(false);

    const [formControls, setFormContols] = useState({
        email: createControl(
            {
                type: 'email',
                label: 'Email',
                errorMessage: 'Invalid email',
            },
            { required: true, email: true }
        ),
        password: createControl(
            {
                type: 'password',
                label: 'Password',
                errorMessage: 'Invalid password',
            },
            { required: true, minLength: 6 }
        ),
    });

    function onChangeHandler(e: FormEvent<HTMLInputElement>, controlName: keyof typeof formControls) {
        const updatedFormControls = { ...formControls };
        const control = { ...updatedFormControls[controlName] };

        control.value = e.currentTarget.value;
        control.valid = validate(control.value, control.validation);
        control.touched = true;

        updatedFormControls[controlName] = control;

        const isFormValid = validateForm(updatedFormControls);

        setIsFormValid(isFormValid);
        setFormContols(updatedFormControls);
    }

    function loginHandler() {
        const { email, password } = formControls;

        props.auth(email.value, password.value, true);
    }

    function registerHandler() {
        const { email, password } = formControls;

        props.auth(email.value, password.value, false);
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
        <div className={classes.Auth}>
            <h1>Authorization</h1>

            <form className={classes.AuthForm} onSubmit={(e) => e.preventDefault()}>
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

const connector = connect(null, { auth });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Auth);
