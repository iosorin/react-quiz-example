import React, { MouseEvent } from 'react';
import cls from './Backdrop.module.scss';

type Props = {
    onClick: (e: MouseEvent) => void;
};

const Backdrop = (props: Props): JSX.Element => {
    return <div className={cls.Backdrop} onClick={props.onClick} />;
};

export default Backdrop;
