import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../reducer/actions/actions';

class Quiz extends Component {
    onAnswerClickHandler = (answerId) => {
        /* double success click fix */
        if (this.props.answerState) {
            const key = Object.keys(this.props.answerState);

            if (this.props.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.props.quiz[this.props.activeQuestion];
        const results = this.props.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            });

            const tm = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        answerState: null,
                        activeQuestion: this.props.activeQuestion + 1
                    });
                }
                window.clearTimeout(tm);
            }, 1000);
        } else {
            results[question.id] = 'error';

            this.setState({
                answerState: { [answerId]: 'error' },
                results
            });
        }
    };

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Тест</h1>
                    {this.props.loading ||
                    !this.props.quiz ||
                    !this.props.quiz[this.props.activeQuestion] ? (
                        <Loader />
                    ) : this.props.isFinished ? (
                        <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                    ) : (
                        <ActiveQuiz
                            question={this.props.quiz[this.props.activeQuestion].question}
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            state={this.props.answerState}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results, // {[id]: 'success' 'error'}
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, // {[id]: 'success' 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
