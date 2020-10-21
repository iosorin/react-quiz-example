import { IDWithStatusType, QuizQuestionAnswerType } from '@/types';
import React, { FC } from 'react';
import AnswerItem from './AnswerItem';

type Props = {
    state: IDWithStatusType;
    answers: Array<QuizQuestionAnswerType>;
    onAnswerClick: (id: number) => void;
};

const AnswersList: FC<Props> = (props) => {
    if (!props.answers.length) return null;

    return (
        <ul>
            {props.answers.map((answer, index) => {
                if (!answer) return;

                return (
                    <AnswerItem
                        answer={answer}
                        key={index}
                        onAnswerClick={props.onAnswerClick}
                        state={props.state ? props.state[answer.id] : null}
                    />
                );
            })}
        </ul>
    );
};

export default AnswersList;
