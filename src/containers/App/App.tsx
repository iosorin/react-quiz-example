import React, { FC, useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { autoLogin } from '@/store/actions/auth';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from '@/hoc/Layout/Layout';
import Quiz from '@/containers/Quiz/Quiz';
import QuizList from '@/containers/QuizList/QuizList';
import QuizCreator from '@/containers/QuizCreator/QuizCreator';
import Auth from '@/containers/Auth/Auth';
import Logout from '@/components/Logout/Logout';
import { getLogged } from '@/store/selectors';
import { RootState } from '@/types';

const App: FC<PropsFromRedux> = (props) => {
    useEffect(() => {
        props.autoLogin();
    }, []);

    let routes = (
        <Switch>
            <Route component={Auth} path="/auth" />
            <Route component={QuizCreator} path="/quiz-creator" />
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

/* Simple Selector Usage example (computed value) */
const mapStateToProps = (state: RootState) => ({ isLogged: getLogged(state) });
const connector = connect(mapStateToProps, { autoLogin });

/* ConnectedProps, connector Usage example (simple connect) */
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(App));
