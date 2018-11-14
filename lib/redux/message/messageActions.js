export const actionTypes = {
    SET_MESSAGE: 'SET_MESSAGE'
};

export const setMessage = (message) => {
    return {
        type: actionTypes.SET_MESSAGE,
        message: message
    }
};