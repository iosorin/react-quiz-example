import React, { useState, useEffect, useRef } from 'react';

import FetchEffectExample from './FetchEffectExample';
import RefExample from './RefExample';
import MemoExample from './MemoExample';
import CallbackExample from './CallbackExample';
import ContextExample from './ContextExample/Parent';
import ReducerExample from './ReducerExample/Parent';
import CustomExamples from './CustomExamples';

const Hooks = () => {
    const n1 = 'John Duglas';
    const n2 = 'Mari Jonathan';

    const [name, setName] = useState(n1);

    useEffect(() => {
        document.title = name;
        localStorage.setItem('Name', name);
    }, [name]);

    const [pos, setPos] = useState({ left: 0, top: 0 });

    const mouseMoveTarget = useRef(null);

    useEffect(() => {
        const target = mouseMoveTarget.current;

        function handleMouseMove(e) {
            setPos({ left: e.pageX, top: e.pageY });
        }

        target.addEventListener('mousemove', handleMouseMove);

        return () => target.removeEventListener('mousemove', handleMouseMove);
    });

    return (
        <div>
            <a href="https://usehooks.com/" target="_blank">
                <h2>https://usehooks.com/</h2>
            </a>
            <div className="mousemove-target" ref={mouseMoveTarget}>
                <h2>State, Effect Examples</h2>

                <code>{JSON.stringify(pos, null, 2)}</code>

                <button onClick={() => setName(name === n1 ? n2 : n1)}>Update name</button>
            </div>
            <r />
            <FetchEffectExample />
            <hr />
            <RefExample />
            <hr />
            <MemoExample />
            <hr />
            <CallbackExample />
            <hr />
            <ContextExample />
            <hr />
            <ReducerExample />
            <hr />
            <CustomExamples />
        </div>
    );
};

export default Hooks;
