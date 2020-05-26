import { HomePage, LoginPage, RegisterPage } from 'app/pages';

export enum routesPath {
    home = '/',
    login = '/login',
    register = '/register',
}

export interface IRouteConfig {
    path: routesPath;
    // tslint:disable-next-line: no-any
    component: any;
    exact: boolean;
    routes?: IRouteConfig[];
}

export const routes: IRouteConfig[] = [
    {
        path: routesPath.home,
        component: HomePage,
        exact: true,
    },
    {
        path: routesPath.login,
        component: LoginPage,
        exact: true,
    },
    {
        path: routesPath.register,
        component: RegisterPage,
        exact: true,
    },
];
