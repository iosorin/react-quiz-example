import React from 'react';
import { useState } from 'react';
import { useInput, useLogger } from './hooks';

const CustomExamples = () => {
    const name = useInput('john');
    const lastname = useInput('black');

    useLogger(name.value);

    return (
        <div>
            <h2>My own Custpm examples</h2>
            <b>name: {name.value};</b> &nbsp;
            <b>lastname: {lastname.value};</b>&nbsp;
            <br />
            <input type="text" {...name} />
            <input type="text" {...lastname} />
        </div>
    );
};

export default CustomExamples;
