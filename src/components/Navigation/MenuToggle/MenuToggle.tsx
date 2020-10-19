import React, { FC, MouseEvent } from 'react';
import classes from './MenuToggle.module.scss';

type Props = {
    isOpen: boolean;
    onToggle: (e: MouseEvent) => void;
};

const MenuToggle: FC<Props> = (props) => {
    const cls = [classes.MenuToggle, 'fa'];

    cls.push(props.isOpen ? 'fa-times' : 'fa-bars');

    if (props.isOpen) {
        cls.push(classes.open);
    }

    return <i className={cls.join(' ')} onClick={props.onToggle} />;
};

export default MenuToggle;
