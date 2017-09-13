import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class ValidateParamGuard implements CanActivate {

  constructor(private router: Router, private pagination: PaginationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log(route.paramMap, route.data);

    return this.checkParamTypes(route.data, route.paramMap);
  }

  checkParamTypes(data, paramMap) {
    const paramValidators = data.paramValidators;
    const fallbackUrl = data.fallbackUrl || '/';

    if (!(paramValidators instanceof Object)) {
      return true;
    }

    for (const paramName of Object.keys(paramValidators)) {
      const validatorName = paramValidators[paramName];
      const paramValue = paramMap.get(paramName);

      if (!validatorName || typeof this[validatorName] !== 'function') {
        console.error('ValidateParamGuard - validator function: ' + validatorName + ' is not declared');
        return false;
      }

      if (!this[validatorName](paramValue)) {
        this.router.navigate([fallbackUrl]);
        console.warn('ValidateParamGuard - Parameter: ' + paramName + '[' + paramValue + '] doesn\'t pass "' + validatorName + '" validation. Redirecting to: ' + fallbackUrl);
        return false;
      }
    }

    return true;
  }

  isPositiveNumber(value): boolean {
    const parsedValue = +value;
    console.log(this.pagination.pageCount, parsedValue);
    return this.pagination.pageCount === 0 || parsedValue > 0 && parsedValue <= this.pagination.pageCount;
  }
}
