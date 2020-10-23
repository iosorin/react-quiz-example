import React, { FC } from 'react';
import classes from './Loader.module.scss';

type Props = {
    size?: string | number;
    centered?: boolean;
};

const Loader: FC<Props> = ({ size = 80, centered = false }) => {
    return (
        <div
            className={classes.Loader + ' ' + (centered ? classes.centered : '')}
            style={{ width: size + 'px', height: size + 'px' }}
        >
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

export default Loader;
