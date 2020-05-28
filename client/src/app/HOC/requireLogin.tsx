import React from 'react';
import { Redirect, withRouter } from 'react-router';
import { useSelector } from 'app/custom-hooks';
import { routesPath } from 'app/config';

// tslint:disable-next-line: no-any
export const requireLogin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        const authentified = useSelector(state => state.authentification.token);

        if (!authentified) {
            return <Redirect to={{ pathname: routesPath.login }} />;
        }
        return <ChildComponent {...props} />;
    };
    return withRouter(ComposedComponent);
};
