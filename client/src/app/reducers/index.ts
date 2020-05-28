import { combineReducers, Action } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authentification';

export const appReducer = combineReducers({
    form: formReducer,
    authentification: authReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action) => {
    // if (action.type === ActionTypes.logout) {
    //     // tslint:disable-next-line: no-parameter-reassignment
    //     state = undefined;
    // }

    return appReducer(state, action);
};
