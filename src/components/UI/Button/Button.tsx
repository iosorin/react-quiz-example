import React, { FC, MouseEvent } from 'react';
import classes from './Button.module.scss';

type Props = {
    type?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = ({ children, type = 'primary', disabled, onClick }) => {
    const cls = [classes.Button, classes[type]];

    return (
        <button className={cls.join(' ')} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
