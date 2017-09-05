import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @ViewChild('collapsedNavbar') private collapsedNavbar: ElementRef;

  private isNavExpanded = false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private renderer: Renderer2) {
  }

  onToggleNavbar() {
    if (this.isNavExpanded) {
      this.isNavExpanded = false;
      this.renderer.removeClass(this.collapsedNavbar.nativeElement, 'in');
    } else {
      this.isNavExpanded = true;
      this.renderer.addClass(this.collapsedNavbar.nativeElement, 'in');
    }
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
