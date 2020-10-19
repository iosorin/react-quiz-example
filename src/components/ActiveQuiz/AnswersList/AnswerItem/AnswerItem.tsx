import { QuizQuestionAnswerType, Status } from '@/types';
import React, { FC } from 'react';
import classes from './AnswerItem.module.scss';

type Props = {
    state: keyof typeof Status | null;
    onAnswerClick: (id: number) => void;
    answer: QuizQuestionAnswerType;
};

const AnswerItem: FC<Props> = (props) => {
    const cls = [classes.AnswerItem];

    if (props.state) {
        cls.push(classes[props.state]);
    }

    return (
        <li className={cls.join(' ')} onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    );
};

export default AnswerItem;
