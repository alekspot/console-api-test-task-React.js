import * as React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {requestReducer} from './request-reducer';
import logger from 'redux-logger';
import {authReducer} from './auth-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    requestState: requestReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export const StoreProvider = ({children}) => {
    return (
        <Provider store={store}> 
            {children}
        </Provider>
    ); 
};

