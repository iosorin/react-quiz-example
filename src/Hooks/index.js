import React, { useState, useEffect, useRef } from 'react';
import FetchEffectExample from './FetchEffectExample';
import RefExample from './RefExample';

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

    function renderPos() {
        return (
            <ul>
                {Object.keys(pos).map((key) => {
                    return (
                        <li key={pos[key]}>
                            {key}: {pos[key]}
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div>
            <div className="mousemove-target" ref={mouseMoveTarget}>
                <h2>State, Effect Examples</h2>

                {renderPos()}

                <button onClick={() => setName(name === n1 ? n2 : n1)}>Update name</button>
            </div>
            <hr />

            <FetchEffectExample />
            <hr />

            <RefExample />
        </div>
    );
};

export default Hooks;
