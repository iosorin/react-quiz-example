import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthenticated } from '@/selectors';
import MenuToggle from '@/components/Navigation/MenuToggle/MenuToggle';
import Drawer from '@/components/Navigation/Drawer/Drawer';
import classes from './Layout.module.scss';

const Layout: FC = (props) => {
    const isAuthenticated = useSelector(getAuthenticated);

    const [menu, setMenu] = useState(false);
    const toggleMenu = () => setMenu((prev) => !prev);

    return (
        <div className={`${classes.Layout} ${isAuthenticated ? classes.auth : ''}`}>
            <Drawer isAuthenticated={isAuthenticated} isOpen={menu} onToggle={toggleMenu} />

            <MenuToggle isOpen={menu} onToggle={toggleMenu} />

            <main>{props.children}</main>
        </div>
    );
};

export default Layout;
