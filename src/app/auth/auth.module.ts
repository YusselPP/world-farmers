import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { MdDialogModule } from '@angular/material';
import { SigninDialogComponent } from './signin-dialog/signin-dialog.component';

@NgModule({
  declarations: [
    SigninDialogComponent,
    SigninComponent,
    SignupComponent
  ],
  entryComponents: [
    SigninDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule {}
