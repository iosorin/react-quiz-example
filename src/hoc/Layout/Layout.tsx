import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.scss';

import MenuToggle from 'components/Navigation/MenuToggle/MenuToggle';
import Drawer from 'components/Navigation/Drawer/Drawer';

const Layout = (props: any) => {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu((prev) => !prev);
    };

    return (
        <div className={classes.Layout}>
            <Drawer email={props.email} isLogged={props.isLogged} isOpen={menu} onToggle={toggleMenu} />

            <MenuToggle isOpen={menu} onToggle={toggleMenu} />

            <main>{props.children}</main>
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        isLogged: !!state.auth.token,
        email: state.auth.email,
    };
}

export default connect(mapStateToProps)(Layout);
