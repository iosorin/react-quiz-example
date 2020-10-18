import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.scss';

import MenuToggle from 'components/Navigation/MenuToggle/MenuToggle';
import Drawer from 'components/Navigation/Drawer/Drawer';

class Layout extends Component {
    state = {
        menu: false,
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu,
        });
    };

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer isOpen={this.state.menu} isLogged={this.props.isLogged} onToggle={this.toggleMenuHandler} />
                <MenuToggle isOpen={this.state.menu} onToggle={this.toggleMenuHandler} />
                <main>{this.props.children}</main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLogged: !!state.auth.token,
    };
}

export default connect(mapStateToProps)(Layout);
