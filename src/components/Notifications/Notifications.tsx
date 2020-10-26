import { getNotification } from '@/store/selectors';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import classes from './Notifications.module.scss';

export const Notifications: FC = () => {
    const { show, message, type } = useSelector(getNotification);

    return (
        <div className={`${classes.Notification} ${classes[type]} ${show ? classes.show : ''}`}>
            <code>{message}</code>
        </div>
    );
};
