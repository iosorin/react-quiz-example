import React from 'react';
import { useAlert } from './AlertProvider';

const SiblingButton = () => {
    const { toggle } = useAlert();

    return <button onClick={toggle}>Toggle Alert</button>;
};

export default SiblingButton;
