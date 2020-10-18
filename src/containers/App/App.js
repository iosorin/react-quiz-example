import React, { useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from 'hoc/Layout/Layout';

import Auth from 'containers/Auth/Auth';
import Quiz from 'containers/Quiz/Quiz';
import QuizList from 'containers/QuizList/QuizList';
import QuizCreator from 'containers/QuizCreator/QuizCreator';
import Logout from 'components/Logout/Logout';
import { autoLogin } from 'reducer/actions/auth';

const App = (props) => {
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

function mapStateToProps(state) {
    return {
        isLogged: !!state.auth.token,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
