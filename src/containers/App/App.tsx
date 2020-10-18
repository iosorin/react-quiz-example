import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { autoLogin } from 'redux/actions/auth';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from '@/hoc/Layout/Layout';
import Quiz from '@/containers/Quiz/Quiz';
import QuizList from '@/containers/QuizList/QuizList';
import QuizCreator from '@/containers/QuizCreator/QuizCreator';
import Auth from '@/containers/Auth/Auth';
import Logout from '@/components/Logout/Logout';

const App = (props: any) => {
    useEffect(() => {
        props.autoLogin();
    }, []);

    let routes = (
        <Switch>
            <Route component={Auth} path="/auth" />
            <Route component={Quiz} path="/quiz/:id" />
            <Route component={QuizList} exact path="/" />
            <Redirect to="/" />
        </Switch>
    );

    if (props.isLogged) {
        routes = (
            <Switch>
                <Route component={QuizCreator} path="/quiz-creator" />
                <Route component={Quiz} path="/quiz/:id" />
                <Route component={Logout} path="/logout" />
                <Route component={QuizList} exact path="/" />
                <Redirect to="/" />
            </Switch>
        );
    }

    return <Layout>{routes}</Layout>;
};

function mapStateToProps(state: any) {
    return {
        isLogged: !!state.auth.token,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
