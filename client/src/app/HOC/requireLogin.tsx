import React from 'react';
import { Redirect, withRouter } from 'react-router';
import { shallowEqual, useDispatch } from 'react-redux';
import { useSelector } from 'app/custom-hooks';
import { routesPath } from 'app/config';
import { fetchMe } from 'app/actions';

// tslint:disable-next-line: no-any
export const requireLogin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        const { token, user } = useSelector(
            state => state.authentification,
            shallowEqual
        );
        const dispatch = useDispatch();

        if (!token) {
            return <Redirect to={{ pathname: routesPath.login }} />;
        }

        if (!user && token) {
            dispatch(fetchMe());
        }
        return <ChildComponent {...props} />;
    };
    return withRouter(ComposedComponent);
};
