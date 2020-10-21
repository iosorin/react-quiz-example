import React, { FC } from 'react';
import { WrappedFieldProps } from 'redux-form';
import Input from './Input';

const ReduxFormInput: FC<WrappedFieldProps> = ({ input, meta, ...rest }) => {
    return <Input errorMessage={meta.error} touched={meta.visited} valid={meta.valid} {...input} {...rest} />;
};

export default ReduxFormInput;
