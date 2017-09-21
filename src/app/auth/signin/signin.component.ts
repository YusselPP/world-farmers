import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../../directory/const';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  logging = false;

  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
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
          [this.appRoute.SLASH, this.dirRoute.ROOT];

        this.logging = false;
        this.router.navigate(url);
      }, err => {
        console.error(err);
        this.logging = false;
      });
  }

}
