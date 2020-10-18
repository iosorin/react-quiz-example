import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from 'components/UI/Loader/Loader';
import { fetchQuizes } from 'redux/actions/quiz';
import { QuizListItemType } from 'types/quiz';

const QuizList = (props: any) => {
    useEffect(() => {
        props.fetchQuizes();
    }, []);

    function renderQuizes() {
        return props.quizes.map((quiz: QuizListItemType) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    }

    return (
        <div className={classes.QuizList}>
            <h1>Список тестов</h1>
            {props.loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
