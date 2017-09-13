import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectoryComponent } from './directory.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { PagesComponent } from './pages/pages.component';
import { ValidateParamGuard } from '../shared/validate-param-guard.service';

const directoryRoutes: Routes = [
  { path: 'directorio', component: DirectoryComponent, children: [
      { path: 'pagina', component: PagesComponent, children: [
        { path: ':num', component: ContactsListComponent},
        { path: '', redirectTo: '1', pathMatch: 'full' }
      ] },
      { path: 'contacto', children: [
        { path: 'nuevo', component: ContactEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: ContactDetailComponent },
        { path: ':id/editar', component: ContactEditComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: '/404', pathMatch: 'prefix' }
        ] },
      { path: '', redirectTo: 'pagina/1', pathMatch: 'full' }
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
