import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Input from '@/components/UI/Input/Input';
import { validate } from '@/form/formFramework';

type CustomProps = {
    outlined?: boolean;
};

type Props = CustomProps & InjectedFormProps<{}, CustomProps>;

const AccountForm: FC<Props> = (props) => {
    return (
        <form className={`form ${props.outlined ? 'outlined' : ''}`} onSubmit={props.handleSubmit}>
            <div>
                <label>Display Name</label>
                <div>
                    <Field component={Input} name="displayName" placeholder="Last Name" type="text" />
                </div>
            </div>
            <div>
                <button disabled={props.submitting} type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

type FieldsType = {
    displayName: string;
};
const validateForm = ({ displayName }: FieldsType) => {
    const { errors } = validate(displayName, { required: true, minLength: 3 });

    console.log('errors', errors);

    return errors;
};

/* redux-form custom props example */
const AccountReduxForm = reduxForm<{}, CustomProps>({
    form: 'AccountForm',
    validate: validateForm,
})(AccountForm);

export default AccountReduxForm;
