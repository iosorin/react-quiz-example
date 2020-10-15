import React, { useCallback, useState, useEffect } from 'react';

const CallbackExample = () => {
    const [colored, setColored] = useState(true);
    const [count, setCount] = useState(0);

    const [list, setList] = useState([]);

    const styles = {
        color: colored ? '#df2bde' : 'black'
    };

    const generateItemsFromAPI = useCallback(
        (length) => {
            return new Array(length).fill().map((_, i) => 'Element ' + (i + 1));
        },
        [count]
    );

    useEffect(() => {
        console.log('useEffect count render');
        setList(generateItemsFromAPI(count));
    }, [count]);

    return (
        <>
            <h2>Callback Example</h2>

            <h3 style={styles}>Elements count: {count}</h3>

            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setColored((prev) => !prev)}>toggle colored</button>

            <ul>
                {list.length
                    ? list.map((el, key) => {
                          return <li key={key}>{el}</li>;
                      })
                    : 'list is empty'}
            </ul>
        </>
    );
};

export default CallbackExample;

/* не понятно */
