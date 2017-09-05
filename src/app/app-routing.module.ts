import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ContactsListComponent } from './directory/contacts-list/contacts-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  // { path: 'directorio', component: ContactsListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
