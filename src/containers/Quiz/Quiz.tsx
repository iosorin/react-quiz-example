import React, { FC, useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '@/redux/actions/quiz';

import ActiveQuiz from '@/components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '@/components/FinishedQuiz/FinishedQuiz';
import Loader from '@/components/UI/Loader/Loader';

import classes from './Quiz.module.scss';
import { QuizInitialStateType } from '@/types';
import { getQuiz } from '@/redux/selectors';

type Props = QuizInitialStateType & {
    quizAnswerClick: any;
    fetchQuizById: any;
    retryQuiz: any;
    match: any;
};

const Quiz: FC<Props> = (props) => {
    useEffect(() => {
        props.fetchQuizById(props.match.params.id);

        return () => {
            props.retryQuiz();
        };
    }, []);

    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Тест</h1>
                {props.loading || !props.quiz || !props.quiz[props.activeQuestion] ? (
                    <Loader />
                ) : props.isFinished ? (
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
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        ...getQuiz(state),
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchQuizById: (id: number) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId: number) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
