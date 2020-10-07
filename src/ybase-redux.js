const redux = require('redux');

/* Основное ------------- */
const initialState = {
    counter: 0
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                counter: state.counter + 1
            };
        case 'DECREMENT':
            return {
                counter: state.counter - 1
            };
        case 'ADD_NUMBER':
            return {
                counter: state.counter + action.value
            };
        default:
            return state;
    }
};

// Store
const store = redux.createStore(reducer);

// Подписались на изменения в сторе
store.subscribe(() => {
    console.log('Store subscribe', store.getState());
});

// Actions
const addCounter = {
    type: 'INCREMENT'
};

/* Вызываем action --------------------------- */
store.dispatch(addCounter);

// action можно и просто объектом передавать
store.dispatch({ type: 'DECREMENT' });

// можно все что угодно передавать в action, в reducer соотв.ключи у второго параметра(_, action) забирать - action.value
store.dispatch({ type: 'ADD_NUMBER', value: 10 });
