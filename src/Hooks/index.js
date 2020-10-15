import React, { useState, useEffect } from 'react';

const Hooks = () => {
    const n1 = 'John Duglas';
    const n2 = 'Mari Jonathan';

    const [name, setName] = useState(n1);

    useEffect(() => {
        document.title = name;
        localStorage.setItem('Name', name);
    }, [name]);

    const [pos, setPos] = useState({ left: 0, top: 0 });

    useEffect(() => {
        function handleMouseMove(e) {
            setPos({ left: e.pageX, top: e.pageY });
        }

        document.addEventListener('mousemove', handleMouseMove);

        return () => document.removeEventListener('mousemove', handleMouseMove);
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
            <h2>Pos:</h2>

            {renderPos()}

            <hr />

            <button onClick={() => setName(name === n1 ? n2 : n1)}>Update name</button>
        </div>
    );
};

export default Hooks;
