import React, { Component } from 'react';
import classes from './QuizCreator.module.scss';
import { createControl, validate, validateForm } from '../../form/formFramework';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../reducer/actions/create';

function createOptionControl(number) {
    return createControl(
        {
            label: 'Вариант ' + number,
            errorMessage: 'Заполните поле',
            id: number
        },
        { required: true }
    );
}

function createFormContols() {
    return {
        question: createControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Заполните поле'
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    };
}
class QuizCreator extends Component {
    state = {
        rightAnswerId: 1,
        formControls: createFormContols(),
        isFormValid: false
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    createQuizHandler = (event) => {
        event.preventDefault();

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormContols()
        });

        this.props.finishCreateQuiz();
    };

    addQuestionHandler = (e) => {
        e.preventDefault();

        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            id: this.props.quiz.length + 1,
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id
                },
                {
                    text: option2.value,
                    id: option2.id
                },
                {
                    text: option3.value,
                    id: option3.id
                },
                {
                    text: option4.value,
                    id: option4.id
                }
            ]
        };

        this.props.createQuizQuestion(questionItem);

        /* зануляемся */
        this.setState({
            rightAnswerId: 1,
            formControls: createFormContols(),
            isFormValid: false
        });
    };

    onChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls };

        if (!formControls) return;

        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = e.target.value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        const isFormValid = validateForm(formControls);

        this.setState({
            formControls,
            isFormValid
        });
    };

    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Input
                    key={index}
                    type={control.type}
                    value={control.value}
                    label={control.label}
                    valid={control.valid}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(e) => this.onChangeHandler(e, controlName)}
                />
            );
        });
    }

    render() {
        const select = (
            <Select
                label="Выберите правильный ответ"
                value={this.state.rightAnswerId}
                options={[
                    {
                        text: 1,
                        value: 1
                    },
                    {
                        text: 2,
                        value: 2
                    },
                    {
                        text: 3,
                        value: 3
                    },
                    {
                        text: 4,
                        value: 4
                    }
                ]}
                onChange={this.selectChangeHandler}
            />
        );

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler} className={classes.QuizCreatorForm}>
                        {this.renderInputs()}

                        {select}

                        <Button
                            type="primary"
                            disabled={!this.state.isFormValid}
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type="success"
                            disabled={this.props.quiz.length === 0}
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
