import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';

// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig({
//     tokenName: 'access_token',
//     globalHeaders: [{'Content-Type': 'application/json'}]
//   }), http, options);
// }

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    // HttpModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    // {
    //   provide: AuthHttp,
    //   useFactory: authHttpServiceFactory,
    //   deps: [Http, RequestOptions]
    // }
  ]
})
export class AuthModule {}
