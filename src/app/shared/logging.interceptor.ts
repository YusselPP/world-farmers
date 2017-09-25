import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).do(
      event => {
        console.log('Logging interceptor', event);
      }, err => {
        console.error('Logging interceptor error', err);
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
          if (err.status === 401) {
            console.log('auth exception');
          }
        }
      }
    );
  }
}
