import React, { Component } from 'react';
import classes from './Layout.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Layout extends Component {
    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        });
    };

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onToggle={this.toggleMenuHandler}
                />
                <MenuToggle
                    isOpen={this.state.menu}
                    onToggle={this.toggleMenuHandler}
                />
                <main>{this.props.children}</main>
            </div>
        );
    }
}

export default Layout;
