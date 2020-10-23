import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState, UserType } from '@/types';
import { validate } from '@/utils/form';
import { getCurrentUser } from '@/selectors';
import Button from '@/components/UI/Button/Button';
import ReduxFormInput from '@/components/UI/Input/ReduxFormInput';

type OwnProps = {
    outlined?: boolean;
    pending?: boolean;
};

type Props = InjectedFormProps<UserType, OwnProps> & OwnProps;

const AccountForm: FC<Props> = (props) => {
    return (
        <form className={`form ${props.outlined ? 'outlined' : ''}`} onSubmit={props.handleSubmit}>
            <Field component={ReduxFormInput} label="Name" name="displayName" />
            <Field component={ReduxFormInput} label="Email" name="email" />
            <Button disabled={props.submitting} loading={!!pending} type="primary">
                Save
            </Button>
        </form>
    );
};

const validateForm = ({ displayName, email }: UserType) => {
    const errors = {
        email: validate(email, { required: true, email: true }).errorMessage,
        displayName: validate(displayName, { required: true, minLength: 3 }).errorMessage,
    } as { [key: string]: string };

    Object.keys(errors).forEach((key) => {
        if (!errors[key]) {
            delete errors[key];
        }
    });

    return errors;
};

const AccountReduxForm = reduxForm<UserType, OwnProps>({
    form: 'AccountForm',
    validate: validateForm,
})(AccountForm);

const connector = connect((state: RootState) => ({
    initialValues: {
        ...getCurrentUser(state),
    },
}));

export default connector(AccountReduxForm);
