import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

import { NavLink } from 'react-router-dom';

class Drawer extends Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onToggle}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    getLinks() {
        const links = [
            {
                to: '/',
                label: 'Список',
                exact: true,
            },
        ];

        if (this.props.isLogged) {
            links.push({ to: '/quiz-creator', label: 'Создать тест' });
            links.push({ to: '/logout', label: 'Выйти' });
        } else {
            links.push({
                to: '/auth',
                label: 'Авторизация',
                exact: true,
            });
        }

        return links;
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>{this.renderLinks(this.getLinks())}</ul>
                </nav>

                {this.props.isOpen ? <Backdrop onClick={this.props.onToggle} /> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;
