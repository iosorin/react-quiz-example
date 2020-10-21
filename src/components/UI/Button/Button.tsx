import React, { FC, MouseEvent } from 'react';
import Loader from '../Loader/Loader';
import classes from './Button.module.scss';

type Props = {
    type?: string;
    disabled?: boolean;
    loading?: boolean;
    submit?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = ({ children, type: type = 'primary', disabled, loading, onClick }) => {
    const cls = [classes.Button, classes[type]];

    return (
        <button className={cls.join(' ')} disabled={disabled} onClick={onClick}>
            {loading ? <Loader size="20" /> : children}
        </button>
    );
};

export default Button;
