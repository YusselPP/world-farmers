import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AutocompleteDirective } from './autocomplete.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent,
    AutocompleteDirective
  ],
  exports: [
    MapComponent,
    AutocompleteDirective
  ]
})
export class MapModule { }
