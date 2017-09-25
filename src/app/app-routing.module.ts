import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ROUTES } from './const';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ROUTES.NOT_FOUND, component: NotFoundComponent },
  { path: '**', redirectTo: ROUTES.NOT_FOUND }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
