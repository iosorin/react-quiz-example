import React, { FC } from 'react';
import classes from './ActiveQuiz.module.scss';

import { IDWithStatusType, QuizQuestionAnswerType } from '@/types';

import AnswersList from './AnswersList';

type Props = {
    answerNumber: number;
    quizLength: number;
    answers: Array<QuizQuestionAnswerType>;
    state: IDWithStatusType;
    question: string;
    onAnswerClick: (id: number) => void;
};

const ActiveQuiz: FC<Props> = (props) => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>
                        {props.answerNumber}. &nbsp;
                        {props.question}
                    </strong>
                </span>

                <small>
                    {props.answerNumber} / {props.quizLength}
                </small>
            </p>

            <AnswersList answers={props.answers} onAnswerClick={props.onAnswerClick} state={props.state} />
        </div>
    );
};

export default ActiveQuiz;
