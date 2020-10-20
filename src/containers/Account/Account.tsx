import React, { FC } from 'react';

import Button from '@/components/UI/Button/Button';

const Account: FC = () => {
    return (
        <div className="container">
            <h1>Account</h1>

            <form className="form">
                <code>/* account form */</code>
                <Button>click</Button>
            </form>
        </div>
    );
};

export default Account;
