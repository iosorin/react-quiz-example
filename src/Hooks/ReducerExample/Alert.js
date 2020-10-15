import React from 'react';
import { useAlert } from './AlertContext';

const ChildAlert = () => {
    const alert = useAlert();

    if (!alert.visible) return null;

    return (
        <div
            style={{
                backgroundColor: 'red',
                padding: '10px',
                margin: '10px'
            }}
        >
            Child Alert: очень важное сообщение
        </div>
    );
};

export default ChildAlert;
