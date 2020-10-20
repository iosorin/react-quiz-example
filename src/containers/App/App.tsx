import React, { FC, useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { autoLogin } from '@/store/actions/auth';
import { getAuthenticated } from '@/store/selectors';
import { RootState } from '@/types';

import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Layout from '@/hoc/Layout/Layout';
import GuardedRoute from '@/components/GuardedRoute/GuardedRoute';
import Quiz from '@/containers/Quiz/Quiz';
import QuizList from '@/containers/QuizList/QuizList';
import QuizCreator from '@/containers/QuizCreator/QuizCreator';
import Auth from '@/containers/Auth/Auth';
import Account from '@/containers/Account/Account';
import Logout from '@/components/Logout/Logout';

const App: FC<PropsFromRedux> = (props) => {
    useEffect(() => {
        props.autoLogin();
    }, []);

    /* todo: fix protected routes */
    const routes = (
        <Switch>
            <Route component={QuizList} exact path="/" />
            <Route component={Quiz} path="/quiz/:id" />
            <Route component={QuizCreator} path="/quiz-creator" />
            <GuardedRoute component={Account} path="/account" show={props.isAuthenticated} />
            <GuardedRoute component={Logout} path="/logout" show={props.isAuthenticated} />
            <GuardedRoute component={Auth} path="/auth" show={!props.isAuthenticated} />
            <Redirect to="/" />
        </Switch>
    );

    return <Layout>{routes}</Layout>;
};

/* Simple Selector Usage example (computed value) */
const mapStateToProps = (state: RootState) => ({ isAuthenticated: getAuthenticated(state) });
const connector = connect(mapStateToProps, { autoLogin });

/* ConnectedProps, connector Usage example (simple connect) */
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(App));
