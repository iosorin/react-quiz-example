import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import Clicked from '../Clicked';
import { connect } from 'react-redux';
import {
    asyncIncrementCounter,
    decrementCounter,
    incrementCounter
} from '../redux/actions/actions';
class Counter extends Component {
    state = {
        counter: 0
    };

    increment = () => {
        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            };
        });
    };

    decrement = () => {
        this.setState({ counter: this.props.counter - 1 });
    };

    render() {
        return (
            <Auxiliary>
                <h2>Counter {this.props.counter}</h2>
                <button onClick={() => this.props.increment()}>+</button>
                <button onClick={() => this.props.decrement()}>-</button>

                <button
                    style={{ display: 'block', margin: '15px auto' }}
                    onClick={() => this.props.asyncIncrement(100)}
                >
                    Асинхронно прибавить 100
                </button>

                <hr />

                {this.props.children}
                <Clicked />
            </Auxiliary>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter.counter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        /* передаем сюда из компонента value */
        increment: (value = 1) => dispatch(incrementCounter(value)),
        decrement: (value = 1) => dispatch(decrementCounter(value)),
        asyncIncrement: (value = 100) => dispatch(asyncIncrementCounter(value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
