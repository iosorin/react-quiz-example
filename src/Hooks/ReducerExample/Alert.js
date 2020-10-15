import React from 'react';
import { useAlert } from './AlertContext';

const ChildAlert = () => {
    const alert = useAlert();

    if (!alert.visible) return null;

    return (
        <div
            onClick={alert.hide}
            style={{
                backgroundColor: 'red',
                padding: '10px',
                margin: '10px'
            }}
        >
            {alert.text}
        </div>
    );
};

export default ChildAlert;
