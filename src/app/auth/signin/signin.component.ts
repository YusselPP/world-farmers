import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../const';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SigninDialogComponent } from '../signin-dialog/signin-dialog.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  logging = false;
  errorMessage = '';
  @Input() isDialog = false;
  @Input() dialogRef: MdDialogRef<SigninDialogComponent>;

  constructor(
    @Inject(APP_ROUTES) public appRoute,
    public dialog: MdDialog,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.logging) {
      return;
    }

    this.logging = true;
    this.authService.signinUser(email, password)
      .subscribe(res => {
        const url = this.authService.redirectUrl ?
          [this.authService.redirectUrl] :
          ['/', this.appRoute.DIRECTORY];

        this.logging = false;

        if (this.dialogRef) {
          this.dialogRef.close();
        } else {
          this.router.navigate(url);
        }
      }, err => {
        console.error(err);
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Error al procesar la petición con el servidor';
        }
        this.logging = false;
      });
  }
}
