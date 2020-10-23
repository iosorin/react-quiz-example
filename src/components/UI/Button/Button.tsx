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
    const cls = [classes.Button, classes[props.type || ''], props.loading ? classes.loading : ''];

    return (
        <button className={cls.join(' ')} disabled={props.disabled} onClick={props.onClick}>
            {props.loading && <Loader centered size="20" />}
            <div className={props.loading ? classes.invisible : ''}>{props.children}</div>
        </button>
    );
};

export default Button;
