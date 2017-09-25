import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const ajaxReq = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest').append('Content-Type', 'application/json')
    });

    return next.handle(ajaxReq).do(
      event => {}, error => {
        if (error instanceof HttpErrorResponse) {
          console.log('Ajax interceptor url: ', this.router.url);
          if (error.status === 401) {
            console.log('Auth error');
          }
        }
      }
    );
  }
}
