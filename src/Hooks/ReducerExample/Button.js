import React from 'react';
import { useAlert } from './AlertContext';

const SiblingButton = () => {
    const { show, hide, text, setText } = useAlert();

    return (
        <div>
            <button onClick={show}>Dispatch SHOW Alert</button>
            <button onClick={hide}>Dispatch HIDE Alert</button>

            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    );
};

export default SiblingButton;
