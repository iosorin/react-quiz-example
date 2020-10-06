import './App.scss';
import React, { Component } from 'react';
import Car from './Car';
import ErrorBoundary from './ErrorBoundary';
import Counter from './Counter';

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
                }
                // {     name: 'Mazda',     year: 2008 }
            ],
            clicked: false,
            showCars: true,
            title: 'Title'
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
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
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
                            deleteCar={this.deleteCar.bind(
                                this,
                                index
                            )}
                            changeName={(e) =>
                                this.changeCarName(
                                    e.target.value,
                                    index
                                )
                            }
                            onChangeTitle={this.changeTitle.bind(
                                this,
                                car.name
                            )}
                        />
                    </ErrorBoundary>
                );
            });
        }

        return (
            <div className={'App'}>
                <h1>{this.state.title}</h1>

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

                <ClickedContext.Provider value={this.state.clicked}>
                    <Counter />

                    <button
                        onClick={() =>
                            this.setState({
                                clicked: !this.state.clicked
                            })
                        }
                        style={{
                            display: 'block',
                            margin: '10px auto'
                        }}
                    >
                        Change clicked
                    </button>
                </ClickedContext.Provider>

                <hr />
            </div>
        );
    }
}

export default App;
