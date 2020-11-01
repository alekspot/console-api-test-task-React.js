import {api} from '../api';
import {Format, Validate} from '../utils';
import {SELECT_REQUEST, LOGIN_SUCCEEDED, LOGIN_FAILED, SET_USER_DATA, ADD_REQUEST_TO_HISTORY, LOGOUT, SET_LOADING, REMOVE_REQUEST, SET_REQUEST, SET_RESPONSE, CLEAR_HISTORY, USE_RESPONSE_FROM_HISTORY} from './types';
import isEqual from 'lodash.isequal';

const loginSucceeded = () => ({type: LOGIN_SUCCEEDED});
const loginFailed = (error) => ({type: LOGIN_FAILED, error});
const setUserData = (account, sublogin) => ({type: SET_USER_DATA, userData: {account, sublogin}});
const setLogout = () => ({type: LOGOUT});
const setLoading = (isLoading) => ({type: SET_LOADING, isLoading});
export const requestLogin = (fields) => {
    return dispatch => {
        const {login, password, sublogin} = fields;
        const formatPassword = Format.removeSpace(password);

        dispatch(setLoading(true));

        return api.requestLogin(login, formatPassword, sublogin)
            .then(() => {
                dispatch(loginSucceeded());
                dispatch(getUserData());
                dispatch(setLoading(false));
            })
            .catch((err) => {
                const {id, explain} = err;
                const errorMsg = JSON.stringify({id,explain});
                dispatch(loginFailed(err));
                dispatch(setLoading(false));

                return errorMsg;
            });
    };
};

export const getUserData = () => {
    return async dispatch => {
        const {account, sublogin} = await api.getUserData();
        if (account) {
            dispatch(setUserData(account, sublogin));
        }
    };
};

export const requestLogout = () => {
    return async dispatch => {
        await api.logOut();
        dispatch(setLogout());
    };
};

const addToHistory = (request) => ({type: ADD_REQUEST_TO_HISTORY, request});
const useResponseFromHistory = (index) => ({type: USE_RESPONSE_FROM_HISTORY, index});
export const removeRequest = (id) => ({type: REMOVE_REQUEST, id});



export const performRequest = (requestFromHistory) => {

    return async (dispatch, getState) => {

        let requestObj;

        if (requestFromHistory) {
            requestObj = requestFromHistory;
        } 
        else {

            const {request, history} = getState().requestState;

            if (!Validate.isJson(request.value)) {
                
                dispatch(setRequest(request.value, true));
    
                return;
            }

            requestObj = JSON.parse(request.value);

            const indexInHistory = history.findIndex(item => isEqual(item.req, requestObj));

            if (indexInHistory >= 0) {
                if (indexInHistory === history.length - 1) {
                    return;
                } else {
                    dispatch(useResponseFromHistory(indexInHistory));
                    dispatch(selectRequest(history[indexInHistory]));

                    return;
                }
            }    
        }

        try {
            const response = await api.request(requestObj);
           
            dispatch(addToHistory({
                id: response['request.id'],
                req: requestObj,
                res: response,
                isError: false
            }));
            dispatch(setRequest(Format.formatJSON(requestObj), false));
            dispatch(setResponse(response, false));
        } catch (errorResponse) {

            dispatch(addToHistory({
                id: new Date().getTime() + '',
                req: requestObj,
                res: errorResponse,
                isError: true
            }));
            dispatch(setRequest(Format.formatJSON(requestObj), false));
            dispatch(setResponse(errorResponse, true));
        }
    };
};

export const setRequest = (value, isError) => ({type: SET_REQUEST, request: {value, isError}});
export const setResponse = (value, isError) => ({type: SET_RESPONSE, response: {value, isError}});
export const selectRequest = (selected) => ({type: SELECT_REQUEST, selected});
export const clearHistory = () => ({type: CLEAR_HISTORY});
