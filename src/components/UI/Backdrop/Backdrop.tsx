import React from 'react';
import cls from './Backdrop.module';

const Backdrop = (props) => {
    return <div className={cls.Backdrop} onClick={props.onClick}></div>;
};

export default Backdrop;
