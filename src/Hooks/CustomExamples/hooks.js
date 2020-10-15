import { useState } from 'react';
import { useEffect } from 'react';

export function useLogger(value) {
    useEffect(() => {
        console.log('Value change', value);
    }, [value]);
}

export function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const clear = () => setValue('');

    return {
        bind: {
            value,
            onChange
        },
        value,
        clear
    };
}
