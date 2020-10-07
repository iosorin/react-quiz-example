import React from 'react';
import classes from './MenuToggle.module.scss';

const MenuToggle = (props) => {
    const cls = [classes.MenuToggle, 'fa'];

    cls.push(props.isOpen ? 'fa-times' : 'fa-bars');

    if (props.isOpen) {
        cls.push(classes.open);
    }

    return <i className={cls.join(' ')} onClick={props.onToggle}></i>;
};

export default MenuToggle;
