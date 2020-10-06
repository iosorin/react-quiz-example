import React from 'react';
import classes from './Car.module.scss';

export default class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps.name !== this.props.name, nextProps, nextState);
        return nextProps.name.trim !== this.props.name;
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps', nextProps);
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     // this.setState();
    //     console.log('componentWillUpdate', nextProps, nextState);
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps', nextProps, prevState);
        // return {} // смержится с основным стейтом
        // или просто возвращаем пред.стейт
        return prevState;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    getSnapshotBeforeUpdate() {
        console.log('getSnapshotBeforeUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        // if (Math.random() > 0.6) {
        //     throw new Error('it`s to big number');
        // }
        return (
            <div className={classes.Car}>
                <h3>Car: {this.props.name}</h3>
                <p>Year: {this.props.year}</p>
                {this.props.children}
                <input type="text" onChange={this.props.changeName} value={this.props.name}></input>
                <button onClick={this.props.deleteCar}>delete</button>
                <button onClick={this.props.onChangeTitle}>change title</button>
            </div>
        );
    }
}
