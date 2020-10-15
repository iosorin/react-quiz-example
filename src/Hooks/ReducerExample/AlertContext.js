import React, { useContext, useReducer } from 'react';

const AlertContext = React.createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

const SHOW_ALERT = 'show';
const HIDE_ALERT = 'hide';
const SET_ALERT_TEXT = 'set_text';

const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, visible: true };
        case HIDE_ALERT:
            return { ...state, visible: false };
        case SET_ALERT_TEXT:
            return { ...state, text: action.text };

        default:
            return state;
    }
};

export const AlertProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        visible: true,
        text: 'Очень важный alert'
    });

    const show = () => dispatch({ type: SHOW_ALERT });
    const hide = () => dispatch({ type: HIDE_ALERT });
    const setText = (text) => dispatch({ type: SET_ALERT_TEXT, text });

    return (
        <AlertContext.Provider
            value={{
                text: state.text,
                visible: state.visible,
                show,
                hide,
                setText
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

/* тоже самое,что useState , но через редьюсер */
