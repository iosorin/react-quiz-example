import React from 'react';

import { NavLink } from 'react-router-dom';
import Backdrop from 'components/UI/Backdrop/Backdrop';

import classes from './Drawer.module.scss';

const Drawer = (props) => {
    function renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink activeClassName={classes.active} exact={link.exact} onClick={props.onToggle} to={link.to}>
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    function getLinks() {
        const links = [
            {
                to: '/',
                label: 'Список',
                exact: true,
            },
        ];

        if (props.isLogged) {
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

    function render() {
        const cls = [classes.Drawer];

        if (!props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>{renderLinks(getLinks())}</ul>

                    {props.email && (
                        <div>
                            <hr />

                            <i>
                                Email: &nbsp;
                                {props.email}
                            </i>
                        </div>
                    )}
                </nav>

                {props.isOpen ? <Backdrop onClick={props.onToggle} /> : null}
            </React.Fragment>
        );
    }

    return render();
};

export default Drawer;
