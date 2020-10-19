import React, { FC, useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '@/types';
import { getQuiz } from '@/store/selectors';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '@/store/actions/quiz';

import ActiveQuiz from '@/components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '@/components/FinishedQuiz/FinishedQuiz';
import Loader from '@/components/UI/Loader/Loader';

import classes from './Quiz.module.scss';

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & RouteComponentProps<{ id: string }>;

const Quiz: FC<Props> = (props) => {
    useEffect(() => {
        props.fetchQuizById(props.match.params.id);

        return () => {
            props.retryQuiz();
        };
    }, []);

    const renderQuiz = () => {
        return (
            <div className={classes.QuizInner}>
                {props.isFinished ? (
                    <FinishedQuiz onRetry={props.retryQuiz} quiz={props.quiz} results={props.results} />
                ) : (
                    <ActiveQuiz
                        answerNumber={props.activeQuestion + 1}
                        answers={props.quiz[props.activeQuestion].answers}
                        onAnswerClick={props.quizAnswerClick}
                        question={props.quiz[props.activeQuestion].question}
                        quizLength={props.quiz.length}
                        state={props.answerState}
                    />
                )}
            </div>
        );
    };

    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizOuter}>
                <h1>Quiz</h1>
                {props.loading || !props.quiz || !props.quiz[props.activeQuestion] ? <Loader /> : renderQuiz()}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    ...getQuiz(state),
});

const mapDispatchToProps = {
    quizAnswerClick,
    fetchQuizById,
    retryQuiz,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Quiz);
