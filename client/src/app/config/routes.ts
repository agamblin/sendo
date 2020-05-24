export enum routesPath {}

export interface IRouteConfig {
    path: routesPath;
    // tslint:disable-next-line: no-any
    Component: any;
    exact: boolean;
    routes?: IRouteConfig[];
}
export const routes: IRouteConfig[] = [];
