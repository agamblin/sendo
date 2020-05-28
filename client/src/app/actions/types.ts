import { ThunkAction } from 'redux-thunk';
import { Action as ReduxAction } from 'redux';
import { RootState } from 'app/reducers';
import {
    ILoginSuccess,
    ILoginError,
    IRegisterSuccess,
    IRegisterError,
    ILoginRequest,
    IRegisterRequest,
} from './authentification';

export enum ActionTypes {
    loginRequest,
    loginSuccess,
    loginError,
    registerRequest,
    registerSuccess,
    registerError,
    logout,
}

export type Action =
    | ILoginRequest
    | ILoginSuccess
    | ILoginError
    | IRegisterRequest
    | IRegisterSuccess
    | IRegisterError;

export type AppThunk = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    ReduxAction<ActionTypes>
>;

export type ReduxFormValues = { [key: string]: string };
