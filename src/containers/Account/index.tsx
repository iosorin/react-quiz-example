import React from 'react';
import { AccountForm } from '@/components/forms';
import { useDispatch } from 'react-redux';
import { updateUserData } from '@/store/actions/auth';
import { UserInfoType } from '@/types';

const Account = () => {
    const dispatch = useDispatch();

    const onSubmit = (values: UserInfoType) => {
        dispatch(updateUserData(values));
    };

    return (
        <div className="container">
            <h1>Account</h1>

            <AccountForm onSubmit={onSubmit} outlined />
        </div>
    );
};

export default Account;
