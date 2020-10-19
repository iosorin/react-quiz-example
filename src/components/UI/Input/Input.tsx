import React, { FC, HTMLProps } from 'react';
import classes from './Input.module.scss';

type OwnProps = {
    valid: boolean;
    touched: boolean;
    shouldValidate: boolean;
    errorMessage?: string;
};

type Props = OwnProps & HTMLProps<HTMLInputElement>;

function isInvalid(props: OwnProps) {
    return !props.valid && props.shouldValidate && props.touched;
}

const Input: FC<Props> = (props) => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.floor(Math.random() * 100)}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>

            <input id={htmlFor} onChange={props.onChange} type={inputType} value={props.value} />

            {isInvalid(props) && props.errorMessage ? <span>{props.errorMessage}</span> : null}
        </div>
    );
};

export default Input;
