import {Format} from '../utils';
import {SELECT_REQUEST, ADD_REQUEST_TO_HISTORY, USE_RESPONSE_FROM_HISTORY, REMOVE_REQUEST, SET_REQUEST, SET_RESPONSE, CLEAR_HISTORY} from './types';

const initialState = {
    request: {
        isError: false,
        value: '' 
    },
    response: {
        isError: false,
        value: ''
    },
    history: [],
    currentRequestId: null
};

const initialStateDemo = {
    ...initialState,
    request: {
        isError: false,
        value: '{"action" : "ping"}' 
    }
};

export const requestReducer = (state = initialStateDemo, action) => {
   
    switch (action.type) {

    case ADD_REQUEST_TO_HISTORY:
        return {
            ...state, 
            history: [...state.history, action.request],
            currentRequestId: action.request.id
        };

    case SELECT_REQUEST: {
        const {selected} = action;

        return {
            ...state,
            request: {
                isError: false,
                value: Format.formatJSON(selected.req) 
            },
            response: {
                isError: selected.isError,
                value: selected.res
            },
            currentRequestId: selected.id
        };
    }

    case REMOVE_REQUEST: {
        
        const values = action.id === state.currentRequestId ? {
            request: {
                isError: false,
                value: '' 
            },
            response: {
                isError: false,
                value: ''
            }
        } : {};

        return {
            ...state, 
            history: state.history.filter(request => request.id !== action.id),
            ...values
        };
    }

    case USE_RESPONSE_FROM_HISTORY: {
        const history = [...state.history];
        const movedRigth = history.splice(action.index, 1);
        const newHistory =  [...history, ...movedRigth];

        return {
            ...state, 
            history: newHistory,
        };
    }
    
    case SET_REQUEST:
        return {
            ...state, 
            request: action.request
        };

    case SET_RESPONSE:
        return {
            ...state, 
            response: action.response
        };

    case CLEAR_HISTORY:
        return {...initialState};

    default:
        return state;
    }
};









