import React, { FC } from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '@/components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { IDWithStatusType, Status, QuizQuestionType } from '@/types';

type Props = {
    results: IDWithStatusType;
    quiz: Array<QuizQuestionType>;
    onRetry: () => void;
};

const FinishedQuiz: FC<Props> = (props) => {
    if (!props.results) return null;

    const successCount = Object.keys(props.results).reduce((total, key) => {
        const status: keyof typeof Status = props.results[parseInt(key)];

        if (status === Status.success) {
            total++;
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((item, index) => {
                    const cls = [
                        'fa',
                        props.results[item.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[item.id]],
                    ];

                    // debugger;

                    return (
                        <li key={index}>
                            <strong>
                                {index + 1} &nbsp;
                                {item.question}
                                <i className={cls.join(' ')} />
                            </strong>
                        </li>
                    );
                })}
            </ul>

            <p>
                Correct {successCount}/{props.quiz.length}
            </p>

            <div>
                <Button onClick={props.onRetry} type="primary">
                    Retry
                </Button>

                <Link to="/">
                    <Button onClick={props.onRetry} type="success">
                        Go to list
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;
