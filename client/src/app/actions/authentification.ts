import api from 'app/api';
import { ActionTypes, AppThunk, ReduxFormValues } from './types';
import { serializeState, resetSerializedState } from 'app/shared';

/** TYPES */
interface IAuthSuccess {
    token: string;
}

export interface ILoginSuccess {
    type: ActionTypes.loginSuccess;
    payload: string;
}

export interface ILoginError {
    type: ActionTypes.loginError;
    payload: string;
}

/** REGISTER */

export interface IRegisterSuccess {
    type: ActionTypes.registerSuccess;
    payload: string;
}

export interface IRegisterError {
    type: ActionTypes.registerError;
    payload: string;
}

/** ACTION CREATORS */
export const login = (loginFormValues: ReduxFormValues): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        const {
            data: { token },
        } = await api.post<IAuthSuccess>('/users/token', loginFormValues);
        dispatch<ILoginSuccess>({
            type: ActionTypes.loginSuccess,
            payload: token,
        });
        serializeState(getState());
        return Promise.resolve();
    } catch ({
        response: {
            data: { message },
        },
    }) {
        resetSerializedState();
        dispatch<ILoginError>({
            type: ActionTypes.loginError,
            payload: message,
        });
        return Promise.reject(message);
    }
};

export const register = (
    registerFormValues: ReduxFormValues
): AppThunk => async (dispatch, getState) => {
    try {
        const [firstName, ...lastName] = registerFormValues.fullName.split(' ');

        const {
            data: { token },
        } = await api.post<IAuthSuccess>('/users', {
            ...registerFormValues,
            firstName,
            lastName: lastName.toString(),
        });
        /** success */
        dispatch<IRegisterSuccess>({
            type: ActionTypes.registerSuccess,
            payload: token,
        });
        serializeState(getState());
        return Promise.resolve(firstName);
    } catch ({
        response: {
            data: { message },
        },
    }) {
        resetSerializedState();
        /** failure */
        dispatch<IRegisterError>({
            type: ActionTypes.registerError,
            payload: message,
        });
        return Promise.reject(message);
    }
};
