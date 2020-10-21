import React, { FC } from 'react';
import classes from './Loader.module.scss';

type Props = {
    size?: string | number;
};

const Loader: FC<Props> = ({ size = 80 }) => {
    return (
        <div className={classes.Loader} style={{ width: size + 'px', height: size + 'px' }}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

export default Loader;
