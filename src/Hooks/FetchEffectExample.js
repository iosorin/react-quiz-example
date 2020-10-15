import React, { useState, useEffect } from 'react';

const Hooks2 = () => {
    const [type, setType] = useState('users');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}/1`)
            .then((response) => response.json())
            .then((json) => setData(json));
    }, [type]);

    return (
        <div>
            <h2>Effect Example with Fetch</h2>
            <h3>Resource type: {type}</h3>
            <button onClick={() => setType('posts')}>posts</button>
            <button onClick={() => setType('users')}>users</button>
            <button onClick={() => setType('todos')}>todos</button>

            <code>{JSON.stringify(data, null, 2)}</code>
        </div>
    );
};

export default Hooks2;
