import api from 'app/api';
import { serializeState, resetSerializedState } from 'app/shared';
import { AppThunk, ActionTypes } from './types';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IFetchMeSuccess {
    type: ActionTypes.fetchMeSuccess;
    payload: IUser;
}

export interface IFetchMeError {
    type: ActionTypes.fetchMeError;
}

export const fetchMe = (): AppThunk => async (dispatch, getState) => {
    try {
        const { data } = await api.get<IUser>('/users/me', {
            headers: {
                Authorization: `Bearer ${getState().authentification.token}`,
            },
        });
        dispatch<IFetchMeSuccess>({
            type: ActionTypes.fetchMeSuccess,
            payload: data,
        });
        serializeState(getState());
    } catch (err) {
        dispatch<IFetchMeError>({
            type: ActionTypes.fetchMeError,
        });
        resetSerializedState();
    }
};
