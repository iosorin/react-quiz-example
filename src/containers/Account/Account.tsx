import React from 'react';
import { AccountForm } from '@/components/forms';

const Account = (props: any) => {
    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="container">
            <h1>Account</h1>
            <AccountForm onSubmit={onSubmit} outlined />
        </div>
    );
};

export default Account;
