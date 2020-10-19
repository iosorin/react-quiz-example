import React, { useState } from 'react';

import { connect } from 'react-redux';
import { auth } from '@/redux/actions/auth';
import { createControl, validate, validateForm } from '@/form/formFramework';

import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';

import classes from './Auth.module.scss';

const Auth = (props) => {
    const [isFormValid, setIsFormValid] = useState(false);

    const [formControls, setFormContols] = useState({
        email: createControl(
            {
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
            },
            { required: true, email: true }
        ),
        password: createControl(
            {
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
            },
            { required: true, minLength: 6 }
        ),
    });

    function onChangeHandler(e, controlName) {
        const updatedFormControls = { ...formControls };
        const control = { ...updatedFormControls[controlName] };

        control.value = e.target.value;
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
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
                <Input
                    errorMessage={control.errorMessage}
                    key={controlName + index}
                    label={control.label}
                    onChange={(e) => onChangeHandler(e, controlName)}
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
            <h1>Авторизация</h1>

            <form className={classes.AuthForm} onSubmit={(e) => e.preventDefault()}>
                {renderInput()}

                <Button disabled={!isFormValid} onClick={loginHandler} type="success">
                    Войти
                </Button>

                <Button disabled={!isFormValid} onClick={registerHandler} type="primary">
                    Зарегестрироваться
                </Button>
            </form>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, pwd, isLogin) => dispatch(auth(email, pwd, isLogin)),
    };
}

export default connect(null, mapDispatchToProps)(Auth);
