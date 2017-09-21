import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { APP_DIR_ROUTE } from '../directory/const';
import { APP_ROUTE } from '../const';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    private auth: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.redirectUrl = state.url;
      this.router.navigate([this.appRoute.SLASH, this.appRoute.LOGIN]);
      return false;
    }
  }
}
