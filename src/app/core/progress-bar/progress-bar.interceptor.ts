import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProgressBarService } from './progress-bar.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(private progressBarService: ProgressBarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.progressBarService.show();

    return next.handle(req).do(
      event => {

        if (event instanceof HttpResponse) {
          this.progressBarService.hide();
        }
      }, err => {
        this.progressBarService.hide();
      }
    );
  }
}
