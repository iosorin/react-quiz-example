import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axiosQuiz from '../../axios';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
    state = {
        results: {}, // {[id]: 'success' 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [],
        loading: true
    };

    onAnswerClickHandler = (answerId) => {
        /* double success click fix */
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState);

            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

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
                        activeQuestion: this.state.activeQuestion + 1
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

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    };

    async componentDidMount() {
        try {
            const response = await axiosQuiz.get('/quizes/' + this.props.match.params.id + '.json');

            const { data: quiz } = response;

            this.setState({ quiz, loading: false });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Тест</h1>
                    {this.state.loading ? (
                        <Loader />
                    ) : this.state.isFinished ? (
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            state={this.state.answerState}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
