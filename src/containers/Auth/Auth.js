import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { auth } from '../../reducer/actions/auth';

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    submitHandler = (e) => {
        e.preventDefault();
        console.log('submitHandler', e);
    };

    loginHandler = () => {
        const { email, password } = this.state.formControls;

        this.props.auth(email.value, password.value, true);

        // const data = {
        //     email: email.value,
        //     password: password.value,
        //     returnSecureToken: true
        // };

        // try {
        //     const response = await axios.post(
        //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvCB39YSBlxgKvakS19CkGTPgv_Qb3_pw',
        //         data
        //     );

        //     console.log('response', response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    registerHandler = () => {
        const { email, password } = this.state.formControls;

        this.props.auth(email.value, password.value, false);

        // const data = {
        //     email: email.value,
        //     password: password.value,
        //     returnSecureToken: true
        // };

        // try {
        //     const response = await axios.post(
        //         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvCB39YSBlxgKvakS19CkGTPgv_Qb3_pw',
        //         data
        //     );

        //     console.log('response', response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    validateControl = (value, validation) => {
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
    };

    onChangeHandler = (event, controlName) => {
        let isFormValid = true;

        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.valid = this.validateControl(control.value, control.validation);
        control.touched = true;

        formControls[controlName] = control;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls,
            isFormValid
        });
    };

    renderInput() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    valid={control.valid}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(e) => this.onChangeHandler(e, controlName)}
                />
            );
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <h1>Авторизация</h1>

                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                    {this.renderInput()}

                    <Button
                        type="success"
                        disabled={!this.state.isFormValid}
                        onClick={this.loginHandler}
                    >
                        Войти
                    </Button>

                    <Button
                        type="primary"
                        disabled={!this.state.isFormValid}
                        onClick={this.registerHandler}
                    >
                        Зарегестрироваться
                    </Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, pwd, isLogin) => dispatch(auth(email, pwd, isLogin))
    };
}

export default connect(null, mapDispatchToProps)(Auth);
