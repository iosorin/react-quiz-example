import React from 'react';
import { AccountForm } from '@/components/forms';
import { useDispatch } from 'react-redux';
import { sendUserUpdate } from '@/store/actions/user';
import { UserType } from '@/types';

const Account = () => {
    const dispatch = useDispatch();

    const onSubmit = (values: UserType) => {
        dispatch(sendUserUpdate(values));
    };

    return (
        <div className="container">
            <h1>Account</h1>

            <AccountForm onSubmit={onSubmit} outlined />
        </div>
    );
};

export default Account;
