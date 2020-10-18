import React, { MouseEventHandler } from 'react';
import classes from './Button.module.scss';

type Props = {
    onClick: MouseEventHandler;
    type: string;
    disabled: boolean;
    children: React.ReactNode[];
};

const Button = (props: Props) => {
    const cls = [classes.Button, classes[props.type]];

    return (
        <button className={cls.join(' ')} disabled={props.disabled} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
