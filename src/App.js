import './App.scss';
import React, { Component } from 'react';
import { Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';

import Car from './Car';
import CarDetail from './CarDetail';

import About from './About';
import Counter from './Counter';
import ErrorBoundary from './ErrorBoundary';

import { connect } from 'react-redux';

export const ClickedContext = React.createContext(false);

class App extends Component {
    constructor(props) {
        console.log('constructor');

        super(props);

        this.state = {
            cars: [
                {
                    name: 'Ford',
                    year: 2010
                },
                {
                    name: 'Audi',
                    year: 2014
                },
                { name: 'Mazda', year: 2008 }
            ],
            // clicked: false,
            showCars: true,
            title: 'Title',
            isLogged: false
        };
    }

    changeTitle = (newTitle = '') => {
        this.setState({
            title: newTitle + ' ' + Math.floor(Math.random() * 100)
        });
    };

    toggleCars = () => {
        this.setState({
            showCars: !this.state.showCars
        });
    };

    changeCarName = (newName, carIndex) => {
        this.setState({
            cars: this.state.cars.map((car, index) => {
                if (index === carIndex) {
                    car.name = newName;
                }

                return car;
            })
        });
    };

    deleteCar(carIndex) {
        if (true) {
            console.log('bla');
        } else {
            console.log('bla');
        }
        const cars = [...this.state.cars].splice(carIndex, 1);

        this.setState({ cars });
    }

    /* begin lifecycles */
    componentWillMount() {
        // console.log('componentWillMount');
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    /* end lifecycles */

    render() {
        console.log('render');

        let cars = null;

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <ErrorBoundary key={index}>
                        <Car
                            index={index}
                            name={car.name}
                            year={car.year}
                            deleteCar={this.deleteCar.bind(this, index)}
                            changeName={(e) => this.changeCarName(e.target.value, index)}
                            onChangeTitle={this.changeTitle.bind(this, car.name)}
                        >
                            <Link
                                style={{
                                    display: 'block',
                                    margin: '10px auto 20px'
                                }}
                                to={'/cars/' + car.name.toLowerCase()}
                            >
                                see details
                            </Link>
                        </Car>
                    </ErrorBoundary>
                );
            });
        }

        console.log('app', this.props);
        return (
            <div className={'App'}>
                <nav className="nav">
                    <ul>
                        <li>
                            <NavLink
                                to={{
                                    pathname: '/',
                                    search: '?a=1&b=22',
                                    hash: '#section-2'
                                }}
                                exact
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                activeStyle={{
                                    textTransform: 'uppercase'
                                }}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cars">Cars</NavLink>
                        </li>

                        <li>
                            <NavLink to="/counter">Counter</NavLink>
                        </li>
                    </ul>
                </nav>

                <h1>{this.state.title}</h1>

                <button
                    style={{
                        margin: '0 auto 20px'
                    }}
                    onClick={() =>
                        this.setState({
                            isLogged: !this.state.isLogged
                        })
                    }
                >
                    {this.state.isLogged ? 'Logout' : 'Login'}
                </button>

                <hr />

                <Switch>
                    <Route exact path="/" render={() => <h1>Home page</h1>} />

                    {this.state.isLogged ? <Route exact path="/about" component={About} /> : null}

                    <Route path="/cars/:name" component={CarDetail} />

                    <Route
                        path="/cars"
                        render={() => {
                            return (
                                <React.Fragment>
                                    <button
                                        onClick={this.toggleCars}
                                        style={{
                                            display: 'block',
                                            margin: '10px auto'
                                        }}
                                    >
                                        toggle cars
                                    </button>
                                    <div className={'App-container'}>{cars}</div>

                                    <hr />
                                </React.Fragment>
                            );
                        }}
                    />

                    <Route
                        path="/counter"
                        render={() => {
                            return (
                                <ClickedContext.Provider value={this.props.clicked}>
                                    <Counter />

                                    <button
                                        onClick={this.props.toggleClicked}
                                        style={{
                                            display: 'block',
                                            margin: '10px auto'
                                        }}
                                    >
                                        Change clicked
                                    </button>
                                </ClickedContext.Provider>
                            );
                        }}
                    />

                    {/* back to home page */}
                    <Redirect to={'/'} />

                    {/* 404 */}
                    {/* <Route
                        render={() => {
                            return (
                                <h1
                                    style={{
                                        color: 'red',
                                        textAlign: 'center'
                                    }}
                                >
                                    Page not found
                                </h1>
                            );
                        }}
                    /> */}
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        /* теперь получаем доступ к сlicked через this.props в компоненте */
        clicked: state.clicked // clicked можно задать любое новое имя
    };
}

function mapDispatchToProps(dispatch) {
    return {
        /* передаем сюда из компонента value */
        toggleClicked: () => dispatch({ type: 'UPDATE_CLICKED' })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
