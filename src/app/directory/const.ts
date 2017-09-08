import { InjectionToken } from '@angular/core';

export let APP_DIR_ROUTE = new InjectionToken('app.dir.route');

export const DIRECTORY_ROUTE = {
  ROOT: 'directorio',
  PAGE: 'pagina',
  CONTACT: {
    ROOT: 'contacto',
    NEW: 'nuevo',
    EDIT: 'editar'
  }
};
