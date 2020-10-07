import React from 'react';
import classes from './Car.module.scss';
import { withClass } from '../hoc';
import PropTypes from 'prop-types';

class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate', nextProps.name !== this.props.name, nextProps, nextState);
        return nextProps.name.trim !== this.props.name;
    }

    componentDidMount() {
        if (this.props.index === 0) {
            console.log('this.inputRef', this.inputRef);
            this.inputRef.current.focus();
        }
    }

    render() {
        return (
            <React.Fragment>
                <h3>Car: {this.props.name}</h3>
                <p>Year: {this.props.year}</p>
                {this.props.children}
                <input
                    type="text"
                    ref={this.inputRef}
                    onChange={this.props.changeName}
                    value={this.props.name}
                ></input>
                <button onClick={this.props.deleteCar}>delete</button>
                <button onClick={this.props.onChangeTitle}>
                    change title
                </button>
            </React.Fragment>
        );
    }
}

Car.propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.number,
    onChangeTitle: PropTypes.func,
    deleteCar: PropTypes.func,
    changeName: PropTypes.func
};

export default withClass(Car, classes.Car);
