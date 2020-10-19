import React, { useEffect } from 'react';

import classes from './QuizList.module.scss';
import Loader from '@/components/UI/Loader/Loader';
import { NavLink } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';
import { fetchQuizes } from '@/redux/actions/quiz';
import { QuizListItemType } from '@/types/quiz';
import { RootState } from '@/types/root';

const mapState = (state: RootState) => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
    };
};

const mapDispatch = {
    fetchQuizes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const QuizList = (props: PropsFromRedux) => {
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

export default connector(QuizList);
