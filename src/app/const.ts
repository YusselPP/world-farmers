import { InjectionToken } from '@angular/core';
import { ROUTES as AUTH_ROUTES } from './auth/const';
import { ROUTES as DIRECTORY_ROUTES } from './directory/const';

export let APP_ROUTES = new InjectionToken('app.route');

export const ROUTE_COMPONENTS = {
  HOME: '/',
  NOT_FOUND: 'not-found'
};

export const ROUTES = {
  HOME: ROUTE_COMPONENTS.HOME,
  NOT_FOUND: ROUTE_COMPONENTS.NOT_FOUND,
};

Object.assign(ROUTES, AUTH_ROUTES);
Object.assign(ROUTES, DIRECTORY_ROUTES);
