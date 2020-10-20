import React, { ComponentType, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps & {
    component: ComponentType;
    redirect?: string;
    show?: boolean;
};

const GuardedRoute: FC<Props> = ({ component: Component, redirect = '/', show = false, ...rest }) => {
    return (
        <Route render={(props) => (show === true ? <Component {...props} /> : <Redirect to={redirect} />)} {...rest} />
    );
};

export default GuardedRoute;
