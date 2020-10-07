import React, { Component } from 'react';
import Auxiliary from '../hoc/Auxiliary';
import Clicked from '../Clicked';
import { connect } from 'react-redux';
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
                <hr />

                {this.props.children}
                <Clicked />
            </Auxiliary>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        increment: (value = 1) => dispatch({ type: 'INCREMENT_COUNTER', value }),
        decrement: (value = 1) => dispatch({ type: 'DECREMENT_COUNTER', value })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
