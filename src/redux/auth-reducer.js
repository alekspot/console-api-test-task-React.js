import {api} from '../api';
import {LOGIN_SUCCEEDED, SET_LOADING, SET_USER_DATA, LOGOUT, LOGIN_FAILED} from './types';

const initialState = {
    isAuth: api.isAuth(),
    account: null,
    sublogin: null,
    error: null,
    isLoading: false
};

export const authReducer = (state = initialState, action) => {
   
    switch (action.type) {
        
    case SET_LOADING: 
        return {
            ...state,
            isLoading: action.isLoading
        };

    case LOGIN_SUCCEEDED: 
        return {
            ...state,
            error: null,
            isAuth: true
        };

    case LOGIN_FAILED: 
        return {
            ...state,
            error: action.error
        };

    case SET_USER_DATA:
        return {
            ...state, 
            account: action.userData.account,
            sublogin: action.userData.sublogin
        };

    case LOGOUT:
        return {
            isAuth: false,
            account: null,
            sublogin: null,
            error: null
        };
            
    default:
        return state;
    }
};









