import React, { useMemo, useState, useEffect } from 'react';

function expensiveComputed(num) {
    console.log('expensiveComputed');
    let i = 0;
    while (i < 1000000000) i++;
    return num * 2;
}

const MemoExample = () => {
    const [number, setNumber] = useState(0);
    const [colored, setColored] = useState(true);

    const computed = useMemo(() => {
        return expensiveComputed(number);
    }, [number]);

    /* как отсматривать объекты, а не примитиыне значения */
    const styles = useMemo(() => {
        return {
            color: colored ? 'blue' : 'black'
        };
    }, [colored]);

    useEffect(() => {
        console.log('styles', styles);
    }, [styles]);

    return (
        <>
            <h2>Memo Example</h2>
            <h3 style={styles}>Computed number: {computed}</h3>

            <button onClick={() => setNumber(number + 1)}>+</button>
            <button onClick={() => setNumber(number - 1)}>-</button>
            <button onClick={() => setColored((prev) => !prev)}>toggle colored</button>
        </>
    );
};

export default MemoExample;

/* какую проблему решает - при тоггле цвета компонент перерндиривается заново и дорогие вычисления тоже заново высчитываются, поэтому видно задержку при смене флага colored, хотя expensiveComputed() относится к number*/

/* с помощью useMemo мы запускаем expensiveComputed() только когда нам это действительно необходимо - т.е когда изменилось число(number)*/

/*
Таким образом - теперь будет задержка в вычислении числа, и не будет задержки при смене цвета, хотя бы заново рендерим наш компонент каждый раз, проходясь по всем функциям и вызовам
*/
