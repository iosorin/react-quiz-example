import React from 'react';
import { useAlert } from './AlertContext';

const SiblingButton = () => {
    const { toggle } = useAlert();

    return <button onClick={toggle}>Toggle Alert</button>;
};

export default SiblingButton;
