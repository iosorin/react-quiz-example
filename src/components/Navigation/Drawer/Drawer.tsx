import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';
import Backdrop from '@/components/UI/Backdrop/Backdrop';

import classes from './Drawer.module.scss';

type Props = {
    email: string;
    isLogged: boolean;
    isOpen: boolean;
    onToggle: () => void;
};

type LinkType = {
    to: string;
    label: string;
    exact?: boolean;
};

const Drawer: FC<Props> = (props) => {
    function renderLinks(links: LinkType[]) {
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

    function getLinks(): LinkType[] {
        const links = [
            { to: '/', label: 'Quiz List', exact: true },
            { to: '/quiz-creator', label: 'New quiz', exact: true },
        ];

        if (props.isLogged) {
            links.push({ to: '/logout', label: 'Sign Out', exact: false });
        } else {
            links.push({
                to: '/auth',
                label: 'Sign In',
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

                    {props.email && <div className={classes.Email}>{props.email}</div>}
                </nav>

                {props.isOpen ? <Backdrop onClick={props.onToggle} /> : null}
            </React.Fragment>
        );
    }

    return render();
};

export default Drawer;
