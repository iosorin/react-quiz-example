import React, { Component } from 'react';
// import axiosQuiz from '../../axios';
import { connect } from 'react-redux';

import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../reducer/actions/quiz';

class QuizList extends Component {
    renderQuizes() {
        console.log('this.props', this.props);
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            );
        });
    }

    componentDidMount() {
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <h1>Список тестов</h1>

                {this.props.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: (payload) => dispatch(fetchQuizes(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
