import React from 'react';
import Button from './Button';
import Alert from './Alert';
import { AlertProvider } from './AlertContext';

function Parent() {
    return (
        <AlertProvider>
            <div>
                <h2>Context example</h2>
                <Alert />

                <Button />
            </div>
        </AlertProvider>
    );
}

export default Parent;
