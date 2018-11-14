import {actionTypes} from './messageActions';

const DEFAULT = {
    message: ''
};

function setMessage(state, message) {
    return {
        ...state,
        message: message
    }
}

export default (state = DEFAULT, action) => {
    switch (action.type) {
        case actionTypes.SET_MESSAGE:
            return setMessage(state, action.message);
        default:
            return state;
    }
}
