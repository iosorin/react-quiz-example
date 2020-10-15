import React from 'react';
import { useInput, useLogger } from './hooks';

const CustomExamples = () => {
    const name = useInput('john');
    const lastname = useInput('black');

    useLogger(name.value);

    return (
        <div>
            <h2>My own Custpm examples</h2>
            {name.value.length ? <b>name: {name.value};</b> : null}&nbsp;
            {lastname.value.length ? <b>lastname: {lastname.value};</b> : null}&nbsp;
            <br />
            <input type="text" {...name.bind} />
            <button onClick={name.clear}>clear name</button>
            <input type="text" {...lastname.bind} />
        </div>
    );
};

export default CustomExamples;
