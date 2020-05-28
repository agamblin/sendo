import { ThunkAction } from 'redux-thunk';
import { Action as ReduxAction } from 'redux';
import { RootState } from 'app/reducers';
import {
    ILoginSuccess,
    ILoginError,
    IRegisterSuccess,
    IRegisterError,
} from './authentification';
import { IFetchMeSuccess, IFetchMeError } from './user';

export enum ActionTypes {
    loginSuccess,
    loginError,
    registerSuccess,
    registerError,
    fetchMeSuccess,
    fetchMeError,
    logout,
}

export type Action =
    | ILoginSuccess
    | ILoginError
    | IRegisterSuccess
    | IRegisterError
    | IFetchMeSuccess
    | IFetchMeError;

export type AppThunk = ThunkAction<
    Promise<any>,
    RootState,
    unknown,
    ReduxAction<ActionTypes>
>;

export type AsyncDispatch = (action: Function) => Promise<void>;

export type ReduxFormValues = { [key: string]: string };
