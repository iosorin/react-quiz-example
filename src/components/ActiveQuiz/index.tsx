import React, { FC } from 'react';
import classes from './ActiveQuiz.module.scss';

import AnswersList from './AnswersList';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswerState, getQuizAnswers } from '@/store/selectors';
import { quizAnswerClick } from '@/store/actions/quiz';

type Props = {
    questionNumber: number;
    quizLength: number;
    question: string;
};

const ActiveQuiz: FC<Props> = (props) => {
    const answers = useSelector(getQuizAnswers);
    const state = useSelector(getAnswerState);

    const dispatch = useDispatch();
    const onAnswerClick = (answerId: number) => dispatch(quizAnswerClick(answerId));

    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>
                        {props.questionNumber}. &nbsp;
                        {props.question}
                    </strong>
                </span>

                <small>
                    {props.questionNumber} / {props.quizLength}
                </small>
            </p>

            <AnswersList answers={answers} onAnswerClick={onAnswerClick} state={state} />
        </div>
    );
};

export default ActiveQuiz;
