import { NOTIFICATION } from '@/store/constants';

export const initialState = {
    show: false,
    type: 'default',
    message: '',
};

const notificationsReducers = (state = initialState, action: any): typeof initialState => {
    switch (action.type) {
        case NOTIFICATION.show:
            return { ...state, show: true, message: action.payload.message, type: action.payload.type || 'default' };

        case NOTIFICATION.hide:
            return { ...state, show: false };

        default:
            return state;
    }
};

export default notificationsReducers;
