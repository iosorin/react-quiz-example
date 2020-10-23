import React, { FC } from 'react';
import { Status, QuizQuestionType } from '@/types';
import { Link } from 'react-router-dom';
import Button from '@/components/UI/Button/Button';
import classes from './FinishedQuiz.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizResults } from '@/selectors';
import { retryQuiz as retryQuizAction } from '@/store/actions/quiz';

type Props = {
    questions: Array<QuizQuestionType>;
};

const FinishedQuiz: FC<Props> = (props) => {
    const results = useSelector(getQuizResults);

    const dispatch = useDispatch();
    const retryQuiz = () => dispatch(retryQuizAction());

    const successCount = Object.keys(results).reduce((total, key) => {
        const status: keyof typeof Status = results[parseInt(key)];

        if (status === Status.success) {
            total++;
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.questions.map((item, index) => {
                    const cls = [
                        'fa',
                        results[item.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[results[item.id]],
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
                    Total: {successCount}/{props.questions.length}
                </b>
            </p>

            <div>
                <Button onClick={() => retryQuiz()} type="primary">
                    Retry
                </Button>

                <Link to="/">
                    <Button type="success">Go to list</Button>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;
