import api from 'app/api';
import { ActionTypes, AppThunk, ReduxFormValues } from './types';
import { serializeState, resetSerializedState } from 'app/shared';

// export interface IUser {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     avatarUrl: string;
// }

/** TYPES */
interface IAuthSuccess {
    token: string;
}

/** LOGIN  */
export interface ILoginRequest {
    type: ActionTypes.loginRequest;
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

export interface IRegisterRequest {
    type: ActionTypes.registerRequest;
}

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
        if (getState().authentification.login.isLoading) {
            return Promise.resolve();
        }
        dispatch<ILoginRequest>({ type: ActionTypes.loginRequest });
        const {
            data: { token },
        } = await api.post<IAuthSuccess>('/users/token', loginFormValues);
        dispatch<ILoginSuccess>({
            type: ActionTypes.loginSuccess,
            payload: token,
        });
        serializeState(getState());
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
    }
};

export const register = (
    registerFormValues: ReduxFormValues
): AppThunk => async (dispatch, getState) => {
    try {
        const [firstName, ...lastName] = registerFormValues.fullName.split(' ');

        /** avoid race conditions */
        if (getState().authentification.register.isLoading) {
            return Promise.resolve();
        }
        /** indicate request is processing  */
        dispatch<IRegisterRequest>({ type: ActionTypes.registerRequest });
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
    }
};
