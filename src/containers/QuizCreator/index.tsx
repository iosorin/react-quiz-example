import React, { FC, FormEvent, MouseEvent, useState } from 'react';

import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '@/store/actions/create';
import { createControl, validate, validateForm } from '@/utils/form';

import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '@/types/root';
import { QuizQuestionType, QuizType } from '@/types';

import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import Select from '@/components/UI/Select/Select';
import Modal from '@/components/UI/Modal/Modal';

import classes from './QuizCreator.module.scss';

function createOptionControl(id = 0) {
    return createControl(
        {
            label: 'Variant ' + id,
            id,
        },
        { required: true }
    );
}

function createFormContols() {
    return {
        question: createControl(
            {
                label: 'Question:',
            },
            { required: true, minLength: 5 }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

type MapStatePropsType = {
    quiz: QuizType;
};

type MapDispatchPropsType = {
    finishCreateQuiz: (name: string) => void;
    createQuizQuestion: (question: QuizQuestionType) => void;
};

type Props = MapStatePropsType & MapDispatchPropsType;

const QuizCreator: FC<Props> = (props) => {
    const [rightAnswerId, setRightAnswerId] = useState(1);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formControls, setFormControls] = useState(createFormContols());
    const [quizName, setQuizName] = useState('');
    const [quizNameModal, setQuizNameModal] = useState(false);

    function resetState() {
        setRightAnswerId(1);
        setIsFormValid(false);
        setFormControls(createFormContols());
    }

    async function createNewQuiz() {
        await props.finishCreateQuiz(quizName);

        resetState();
        setQuizNameModal(false);
    }

    function onChangeHandler(e: FormEvent<HTMLInputElement>, controlName: keyof typeof formControls) {
        if (!formControls) return;

        const updatedFormControls = { ...formControls };
        const control = { ...updatedFormControls[controlName] };

        control.touched = true;
        control.value = e.currentTarget.value;

        const { valid, errorMessage } = validate(control.value, control.validation);
        control.valid = valid;
        control.errorMessage = errorMessage; // computed errorMessage example

        updatedFormControls[controlName] = control;

        const isFormValid = validateForm(updatedFormControls);

        setIsFormValid(isFormValid);
        setFormControls(updatedFormControls);
    }

    function handleNewQuestion(e: MouseEvent) {
        e.preventDefault();

        const { question, option1, option2, option3, option4 } = formControls;

        const questionItem: QuizQuestionType = {
            rightAnswerId,
            id: props.quiz.questions.length + 1,
            question: question.value,
            answers: [
                {
                    text: option1.value,
                    id: option1.id || -1, // todo: fix optional id property
                },
                {
                    text: option2.value,
                    id: option2.id || -1,
                },
                {
                    text: option3.value,
                    id: option3.id || -1,
                },
                {
                    text: option4.value,
                    id: option4.id || -1,
                },
            ],
        };

        props.createQuizQuestion(questionItem);

        resetState();
    }

    const select = (
        <Select
            label="Right Answer"
            onChange={(e) => setRightAnswerId(+e.currentTarget.value)}
            options={[
                {
                    text: 1,
                    value: 1,
                },
                {
                    text: 2,
                    value: 2,
                },
                {
                    text: 3,
                    value: 3,
                },
                {
                    text: 4,
                    value: 4,
                },
            ]}
            value={rightAnswerId}
        />
    );

    function renderInputs() {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName as keyof typeof formControls];

            return (
                <Input
                    errorMessage={control.errorMessage}
                    key={index}
                    label={control.label}
                    onChange={(e) => onChangeHandler(e, controlName as keyof typeof formControls)}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    type={control.type}
                    valid={control.valid}
                    value={control.value}
                />
            );
        });
    }

    return (
        <div className={classes.QuizCreator}>
            <div>
                <h1>New Quiz</h1>

                <form className={classes.QuizCreatorForm} onSubmit={(e) => e.preventDefault()}>
                    {renderInputs()}

                    {select}

                    <Button disabled={!isFormValid} onClick={handleNewQuestion} type="primary">
                        Add question
                    </Button>

                    <Button
                        disabled={props.quiz.questions.length === 0}
                        onClick={() => setQuizNameModal(true)}
                        type="success"
                    >
                        Create new quiz
                    </Button>
                </form>

                <Modal
                    isOpen={quizNameModal}
                    name="Quiz Name"
                    onClose={() => setQuizNameModal(false)}
                    onSubmit={createNewQuiz}
                >
                    <Input
                        onChange={(e) => setQuizName(e.currentTarget.value)}
                        shouldValidate={false}
                        style={{ width: '100%' }}
                        value={quizName}
                    />
                </Modal>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({ quiz: state.create.quiz });
const mapDispatchToProps = { createQuizQuestion, finishCreateQuiz };

/* Connect Custom Typing Usage example - manually defined (MapStatePropsType, MapDispatchPropsType, RouteComponentProps, RootState) above  */
const connector = connect<MapStatePropsType, MapDispatchPropsType, RouteComponentProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
);

export default connector(QuizCreator);
