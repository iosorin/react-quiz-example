import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { validate } from '@/form/formFramework';
import ReduxFormInput from '@/components/UI/Input/ReduxFormInput';
import { connect } from 'react-redux';
import { RootState } from '@/types';
import { getEmail } from '@/store/selectors';

type FormType = {
    firstName: string;
    lastName: string;
    email: string;
};

type CustomProps = FormType & {
    outlined?: boolean;
};

type Props = CustomProps & InjectedFormProps<{}, CustomProps>;

const AccountForm: FC<Props> = (props) => {
    return (
        <form className={`form ${props.outlined ? 'outlined' : ''}`} onSubmit={props.handleSubmit}>
            <div>
                <Field component={ReduxFormInput} label="First Name" name="firstName" />
            </div>
            <div>
                <Field component={ReduxFormInput} label="Last Name" name="lastName" />
            </div>
            <div>
                <Field component={ReduxFormInput} label="Email" name="email" />
            </div>
            <div>
                <button disabled={props.submitting} type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

const validateForm = ({ firstName, lastName, email }: FormType) => {
    const errors = {
        firstName: validate(firstName, { required: true, minLength: 3 }).errorMessage,
        lastName: validate(lastName, { required: true, minLength: 3 }).errorMessage,
        email: validate(email, { required: true, email: true }).errorMessage,
    };

    Object.keys(errors).forEach((key) => {
        if (!errors[key as keyof FormType]) {
            delete errors[key as keyof FormType];
        }
    });

    return errors;
};

const AccountReduxForm = reduxForm<{}, any>({
    form: 'AccountForm',
    validate: validateForm,
})(AccountForm);

const connector = connect((state: RootState) => ({
    initialValues: {
        email: getEmail(state),
    },
}));

export default connector(AccountReduxForm);
