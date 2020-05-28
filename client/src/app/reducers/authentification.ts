import { Action, ActionTypes } from 'app/actions';
import { combineReducers } from 'redux';

interface IRequest {
    errorMsg: string | null;
    isLoading: boolean;
}

const DEFAULT_STATE_REQUEST = {
    errorMsg: null,
    isLoading: false,
};

const token = (state: string | null = null, action: Action): string | null => {
    switch (action.type) {
        case ActionTypes.loginSuccess:
        case ActionTypes.registerSuccess:
            return action.payload;
        case ActionTypes.loginError:
        case ActionTypes.registerError:
            return null;
        default:
            return state;
    }
};

const login = (
    state: IRequest = DEFAULT_STATE_REQUEST,
    action: Action
): IRequest => {
    switch (action.type) {
        case ActionTypes.loginRequest:
            return { errorMsg: null, isLoading: true };
        case ActionTypes.loginError:
            return { errorMsg: action.payload, isLoading: false };
        case ActionTypes.loginSuccess:
            return DEFAULT_STATE_REQUEST;
        default:
            return state;
    }
};

const register = (
    state: IRequest = DEFAULT_STATE_REQUEST,
    action: Action
): IRequest => {
    switch (action.type) {
        case ActionTypes.registerRequest:
            return { errorMsg: null, isLoading: true };
        case ActionTypes.registerError:
            return { errorMsg: action.payload, isLoading: false };
        case ActionTypes.registerSuccess:
            return DEFAULT_STATE_REQUEST;
        default:
            return state;
    }
};

export default combineReducers({ token, login, register });
