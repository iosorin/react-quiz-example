import React, { useEffect } from 'react';

import ActiveQuiz from 'components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from 'components/FinishedQuiz/FinishedQuiz';
import Loader from 'components/UI/Loader/Loader';

import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from 'redux/actions/quiz';

import classes from './Quiz.module.scss';

const Quiz = (props) => {
    useEffect(() => {
        console.log('FETCHQUIZBYID', props.match.params.id, props);

        props.fetchQuizById(props.match.params.id);

        return () => {
            console.log('RETRY QUIZ');
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

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
