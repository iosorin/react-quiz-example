import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/types';
import MenuToggle from '@/components/Navigation/MenuToggle/MenuToggle';
import Drawer from '@/components/Navigation/Drawer/Drawer';
import classes from './Layout.module.scss';

const Layout: FC<PropsFromRedux> = (props) => {
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

function mapStateToProps(state: RootState) {
    return {
        isLogged: !!state.auth.token,
        email: state.auth.email,
    };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Layout);
