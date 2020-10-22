import React, { FC, MouseEvent } from 'react';
import Loader from '../Loader/Loader';
import classes from './Button.module.scss';

type Props = {
    type?: 'success' | 'error' | 'primary';
    disabled?: boolean;
    loading?: boolean;
    submit?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = (props) => {
    const cls = [classes.Button, classes[props.type || '']];

    return (
        <button className={cls.join(' ')} disabled={props.disabled} onClick={props.onClick}>
            {props.loading ? <Loader size="20" /> : props.children}
        </button>
    );
};

export default Button;
