import React from 'react';

const chars = [
    { name: 'Дарт Вейдер', side: 'dark' },
    { name: 'Люк Скайворкер', side: 'light' },
    { name: 'Палпатин', side: 'dark' },
    { name: 'Обиван Кеноби', side: 'light' }
];

const StarWarsChars = ({ list }) => {
    return (
        <ul>
            {list.map((char, i) => {
                return (
                    <li key={i}>
                        <b>{char.name}</b>
                        &nbsp; (<i>{char.side}</i>)
                    </li>
                );
            })}
        </ul>
    );
};

const withFilteredProps = (Component) => ({ list = chars, side }) => {
    const filtered = side ? list.filter((c) => c.side === side) : list;

    return <Component list={filtered} />;
};

export default withFilteredProps(StarWarsChars);
