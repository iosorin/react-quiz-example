import React, { FC, useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { autoLogin } from '@/store/actions/auth';
import { getAuthenticated } from '@/store/selectors';
import { RootState } from '@/types';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Layout from '@/hoc/Layout/Layout';
import Auth from '@/containers/Auth';
import Account from '@/containers/Account';
import Logout from '@/components/Logout';
import Quiz from '@/containers/Quiz';
import QuizList from '@/containers/QuizList';
import QuizCreator from '@/containers/QuizCreator';
import GuardedRoute from '@/components/GuardedRoute';

const App: FC<PropsFromRedux> = ({ isAuthenticated, autoLogin }) => {
    useEffect(() => {
        if (!isAuthenticated) {
            autoLogin();
        }
    }, [isAuthenticated, autoLogin]);

    /* todo: fix protected routes */
    const routes = (
        <Switch>
            <Route component={QuizList} exact path="/" />
            <Route component={Quiz} path="/quiz/:uuid" />
            <Route component={QuizCreator} path="/quiz-creator" />
            <GuardedRoute component={Account} path="/account" show={isAuthenticated} />
            <GuardedRoute component={Logout} path="/logout" show={isAuthenticated} />
            <GuardedRoute component={Auth} path="/auth" show={!isAuthenticated} />
            <Redirect to="/" />
        </Switch>
    );

    return <Layout>{routes}</Layout>;
};

const mapStateToProps = (state: RootState) => ({ isAuthenticated: getAuthenticated(state) });
const connector = connect(mapStateToProps, { autoLogin });

/* ConnectedProps usage example */
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(App));
