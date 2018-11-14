import {createStore, combineReducers, applyMiddleware} from 'redux';
import messageReducer from './message/messageReducer';

export function configureStore() {
    return createStore(
        combineReducers({
            messageReducer
        }),
        applyMiddleware(
            
        )
    );
}
