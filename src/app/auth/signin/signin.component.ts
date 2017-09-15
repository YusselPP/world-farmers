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
    this.authService.signinUser(email, password);
    if (this.authService.isAuthenticated()) {
      this.router.navigate([
        this.appRoute.SLASH,
        this.dirRoute.ROOT
      ]);
    }
  }

}
