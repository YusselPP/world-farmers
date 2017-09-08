import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { APP_ROUTE } from '../../const';
import { APP_DIR_ROUTE } from '../../directory/const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    @Inject(APP_ROUTE) public appRoute,
    @Inject(APP_DIR_ROUTE) public dirRoute,
    private dataStorageService: DataStorageService,
    private authService: AuthService) {

    console.log('header component');
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes()
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //     }
    //   );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
