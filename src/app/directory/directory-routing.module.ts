import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';

const directoryRoutes: Routes = [
  { path: 'directorio', component: DirectoryComponent, children: [
    { path: '', component: ContactsListComponent },
    { path: 'nuevo', component: ContactEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ContactDetailComponent },
    { path: ':id/editar', component: ContactEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(directoryRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class DirectoryRoutingModule {}
