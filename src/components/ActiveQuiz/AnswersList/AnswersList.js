import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = (props) => {
    return (
        <ul>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        answer={answer}
                        key={index}
                        state={props.state ? props.state[answer.id] : null}
                        onAnswerClick={props.onAnswerClick}
                    />
                );
            })}
        </ul>
    );
};

export default AnswersList;
