import React, { FC, useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '@/types';
import { getQuiz } from '@/selectors';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '@/store/actions/quiz';

import ActiveQuiz from '@/components/ActiveQuiz';
import FinishedQuiz from '@/components/FinishedQuiz';
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
                    <FinishedQuiz onRetry={props.retryQuiz} quiz={props.quiz.questions} results={props.results} />
                ) : (
                    <ActiveQuiz
                        answerNumber={props.activeQuestion + 1}
                        answers={props.quiz.questions[props.activeQuestion].answers}
                        onAnswerClick={props.quizAnswerClick}
                        question={props.quiz.questions[props.activeQuestion].question}
                        quizLength={props.quiz.questions.length}
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
                {props.loading || !props.quiz || !props.quiz.questions[props.activeQuestion] ? (
                    <Loader />
                ) : (
                    renderQuiz()
                )}
            </div>
        </div>
    );
};

/* Spread state props via selector Usage example - not sure it's the correct */
const mapStateToProps = (state: RootState) => ({ ...getQuiz(state) });
const mapDispatchToProps = { quizAnswerClick, fetchQuizById, retryQuiz };

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Quiz);
