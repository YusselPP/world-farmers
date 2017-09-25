import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { PagesComponent } from './pages/pages.component';
import { ROUTE_COMPONENTS } from './const';

const directoryRoutes: Routes = [
  { path: ROUTE_COMPONENTS.ROOT, component: DirectoryComponent, children: [
      { path: ROUTE_COMPONENTS.PAGE, component: PagesComponent, children: [
        { path: ':num', component: ContactsListComponent},
        { path: '', redirectTo: '1', pathMatch: 'full' }
      ] },
      { path: ROUTE_COMPONENTS.CONTACT.ROOT, children: [
        { path: ROUTE_COMPONENTS.CONTACT.NEW, component: ContactEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: ContactDetailComponent },
        { path: ':id/' + ROUTE_COMPONENTS.CONTACT.EDIT, component: ContactEditComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: '/not-found', pathMatch: 'prefix' }
        ] },
      { path: '', redirectTo: ROUTE_COMPONENTS.PAGE + '/1', pathMatch: 'full' }
    ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(directoryRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class DirectoryRoutingModule {}
