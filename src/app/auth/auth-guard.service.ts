import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { APP_ROUTES } from '../const';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(APP_ROUTES) public appRoute,
    private auth: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.redirectUrl = state.url;
      this.router.navigate(['/' + this.appRoute.LOGIN]);
      return false;
    }
  }
}
