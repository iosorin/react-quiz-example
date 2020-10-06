import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import Counter2 from '../Counter2';

export default class Counter extends Component {
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
        this.setState({ counter: this.state.counter - 1 });
    };

    render() {
        return (
            <Auxiliary>
                <h2>Counter {this.state.counter}</h2>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <hr />

                {this.props.children}
                <Counter2 />
            </Auxiliary>
        );
    }
}
