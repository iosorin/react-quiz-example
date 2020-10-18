import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import Backdrop from 'components/UI/Backdrop/Backdrop';

import classes from './Drawer.module.scss';

class Drawer extends Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        activeClassName={classes.active}
                        exact={link.exact}
                        onClick={this.props.onToggle}
                        to={link.to}
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

                    {this.props.email && (
                        <div>
                            <hr />

                            <i>
                                Email: &nbsp;
                                {this.props.email}
                            </i>
                        </div>
                    )}
                </nav>

                {this.props.isOpen ? <Backdrop onClick={this.props.onToggle} /> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;
