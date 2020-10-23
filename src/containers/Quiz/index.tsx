import React, { FC, useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentQuestionNumber, getQuiz, getQuizIsFetching, getQuizIsFinished } from '@/selectors';
import { fetchQuizById } from '@/store/actions/quiz';

import ActiveQuiz from '@/components/ActiveQuiz';
import FinishedQuiz from '@/components/FinishedQuiz';
import Loader from '@/components/UI/Loader/Loader';

import classes from './Quiz.module.scss';

type Props = RouteComponentProps<{ id: string }>;

const Quiz: FC<Props> = (props) => {
    const { questions, name } = useSelector(getQuiz);
    const currentQuestionNumber = useSelector(getCurrentQuestionNumber);
    const isFetching = useSelector(getQuizIsFetching);
    const isFinished = useSelector(getQuizIsFinished);
    const currentQuestion = questions[currentQuestionNumber];

    const dispatch = useDispatch();
    const fetchQuiz = () => dispatch(fetchQuizById(props.match.params.id));

    useEffect(() => {
        fetchQuiz();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.id]);

    const renderQuiz = () => {
        return (
            <div className={classes.QuizInner}>
                {isFinished ? (
                    <FinishedQuiz questions={questions} />
                ) : (
                    <ActiveQuiz
                        question={currentQuestion.question}
                        questionNumber={currentQuestionNumber + 1}
                        quizLength={questions.length}
                    />
                )}
            </div>
        );
    };

    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizOuter}>
                <h1>{name}</h1>

                {isFetching || !currentQuestion ? <Loader /> : renderQuiz()}
            </div>
        </div>
    );
};

export default Quiz;
