import React, { FC, FormEvent, MouseEvent, useState } from 'react';

import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '@/redux/actions/create';
import { createControl, validate, validateForm } from '@/form/formFramework';

import Button from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import Select from '@/components/UI/Select/Select';

import classes from './QuizCreator.module.scss';
import { RootState } from '@/types/root';
import { QuizQuestionType } from '@/types';

function createOptionControl(num = 0) {
    return createControl(
        {
            label: 'Вариант ' + num,
            errorMessage: 'Заполните поле',
            id: num.toString(),
        },
        { required: true }
    );
}

function createFormContols() {
    return {
        question: createControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Заполните поле',
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

type Props = any;

const QuizCreator: FC<Props> = (props) => {
    const [rightAnswerId, setRightAnswerId] = useState(1);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formControls, setFormControls] = useState(createFormContols());

    function resetState() {
        setRightAnswerId(1);
        setIsFormValid(false);
        setFormControls(createFormContols());
    }

    function handleNewQuiz(e: MouseEvent) {
        e.preventDefault();

        resetState();

        props.finishCreateQuiz();
    }

    function onChangeHandler(e: FormEvent<HTMLInputElement>, controlName: keyof typeof formControls) {
        if (!formControls) return;

        const updatedFormControls = { ...formControls };
        const control = { ...updatedFormControls[controlName] };

        control.touched = true;
        control.value = e.currentTarget.value;
        control.valid = validate(control.value, control.validation);

        updatedFormControls[controlName] = control;

        const isFormValid = validateForm(updatedFormControls);

        setIsFormValid(isFormValid);
        setFormControls(updatedFormControls);
    }

    function handleNewQuestion(e: MouseEvent) {
        e.preventDefault();

        const { question, option1, option2, option3, option4 } = formControls;

        const questionItem = {
            rightAnswerId,
            id: props.quiz.length + 1,
            question: question.value,
            answers: [
                {
                    text: option1.value,
                    id: option1.id,
                },
                {
                    text: option2.value,
                    id: option2.id,
                },
                {
                    text: option3.value,
                    id: option3.id,
                },
                {
                    text: option4.value,
                    id: option4.id,
                },
            ],
        };

        props.createQuizQuestion(questionItem);

        resetState();
    }

    const select = (
        <Select
            label="Выберите правильный ответ"
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
                <h1>Создание теста</h1>

                <form className={classes.QuizCreatorForm} onSubmit={(e) => e.preventDefault()}>
                    {renderInputs()}

                    {select}

                    <Button disabled={!isFormValid} onClick={handleNewQuestion} type="primary">
                        Добавить вопрос
                    </Button>

                    <Button disabled={props.quiz.length === 0} onClick={handleNewQuiz} type="success">
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>
    );
};

function mapStateToProps(state: RootState) {
    return {
        quiz: state.create.quiz,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        createQuizQuestion: (item: QuizQuestionType) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
