import React, { FC } from 'react';
import Input from './Input';

type Props = {
    input: any;
    meta: any;
};

const ReduxFormInput: FC<Props> = ({ input, meta, ...rest }) => {
    return <Input errorMessage={meta.error} touched={meta.visited} valid={meta.valid} {...input} {...rest} />;
};

export default ReduxFormInput;
