import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SigninDialogComponent } from '../auth/signin-dialog/signin-dialog.component';
import { MdDialog } from '@angular/material';
import { APP_ROUTES } from '../const';
import { DialogService } from '../core/dialog.service';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private dialogService: DialogService,
              private dialog: MdDialog,
              @Inject(APP_ROUTES) private appRoutes) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const ajaxReq = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest').append('Content-Type', 'application/json')
    });

    return next.handle(ajaxReq).do(
      event => {}, error => {
        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {
            const loginUrl = '/' + this.appRoutes.LOGIN;
            const loginDialog = this.dialog.getDialogById('app-login-dialog');

            if (!loginDialog && this.router.url !== loginUrl) {
              this.dialog.open<SigninDialogComponent>(SigninDialogComponent, {id: 'app-login-dialog', width: '350px'});
            }
          } else if (error.status === 403) {
            this.dialogService.alert('', 'No tienes los permisos suficientes para realizar esta acción');
          } else {
            this.dialogService.alert('', 'Error al procesar la petición con el servidor');
          }
        }
      }
    );
  }
}
