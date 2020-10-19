import React, { FC, MouseEventHandler } from 'react';
import classes from './Button.module.scss';

type Props = {
    type: string;
    disabled?: boolean;
    onClick: MouseEventHandler;
};

const Button: FC<Props> = ({ children, type, disabled, onClick }) => {
    const cls = [classes.Button, classes[type]];

    return (
        <button className={cls.join(' ')} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
