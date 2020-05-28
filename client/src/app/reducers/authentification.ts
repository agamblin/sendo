import { Action, ActionTypes, IUser } from 'app/actions';
import { combineReducers } from 'redux';

interface IRequest {
    errorMsg: string | null;
    isLoading: boolean;
}

const token = (state: string | null = null, action: Action): string | null => {
    switch (action.type) {
        case ActionTypes.loginSuccess:
        case ActionTypes.registerSuccess:
            return action.payload;
        case ActionTypes.loginError:
        case ActionTypes.registerError:
        case ActionTypes.fetchMeError:
            return null;
        default:
            return state;
    }
};

const user = (state: IUser | null = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchMeSuccess:
            return action.payload;
        case ActionTypes.fetchMeError:
            return null;
        default:
            return state;
    }
};

export default combineReducers({ token, user });
