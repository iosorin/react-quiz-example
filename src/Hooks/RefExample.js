import React, { useState, useEffect, useRef } from 'react';

const RefExample = () => {
    // PROBLEM const [renderCount, setRenderCount] = useState(1);
    const [value, setValue] = useState('1234'); // используем,если хотим что-то перерисовать
    const prevValue = useRef(''); // можем следить за прошлым состояние
    const renderCount = useRef(1); // используем,если не хотим ничего перерисовывать (сделать что-то между рендерами)
    const inputRef = useRef(null); // можно использовать для дом-элементов

    useEffect(() => {
        /* infinite loop */
        // PROBLEM setRenderCount((prev) => prev + 1);
        renderCount.current++;
        prevValue.current = value;

        console.log(inputRef.current); // обычнй dom-элемент
    }, [value]);

    function focusRefInptut() {
        inputRef.current.focus();
    }

    return (
        <div>
            <h2>Ref Example</h2>
            <h3>Render count: {renderCount.current}</h3>
            <h3>Prev value (delay): {prevValue.current}</h3>

            <input
                type="text"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button onClick={focusRefInptut}>Focus input</button>
        </div>
    );
};

export default RefExample;
