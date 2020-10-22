import React, { FC } from 'react';
import { IDWithStatusType, Status, QuizQuestionType } from '@/types';
import { Link } from 'react-router-dom';
import Button from '@/components/UI/Button/Button';
import classes from './FinishedQuiz.module.scss';

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

    console.log('props.quiz', props.quiz, props);

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
                            <strong>{index + 1}. &nbsp;</strong>
                            {item.question}
                            <i className={cls.join(' ')} />
                        </li>
                    );
                })}
            </ul>

            <p>
                <b>
                    Correct: {successCount}/{props.quiz.length}
                </b>
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
