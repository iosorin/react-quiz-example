import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/types';
import MenuToggle from '@/components/Navigation/MenuToggle/MenuToggle';
import Drawer from '@/components/Navigation/Drawer/Drawer';
import classes from './Layout.module.scss';
import { getLogged } from '@/store/selectors';

const Layout: FC<PropsFromRedux> = (props) => {
    const [menu, setMenu] = useState(false);
    const toggleMenu = () => setMenu((prev) => !prev);

    const classList = () => `${classes.Layout} ${props.isLogged ? classes.logged : ''}`;

    return (
        <div className={classList()}>
            <Drawer email={props.email} isLogged={props.isLogged} isOpen={menu} onToggle={toggleMenu} />

            <MenuToggle isOpen={menu} onToggle={toggleMenu} />

            <main>{props.children}</main>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    email: state.auth.email,
    isLogged: getLogged(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Layout);
