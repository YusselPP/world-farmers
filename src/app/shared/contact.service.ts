import * as _ from 'lodash';
import { Contact } from '../directory/contact.model';

export class ContactService {
  contacts: Contact[] = [
    new Contact('Agricultor 1', 'x', ['Miel'], '2', '1 Km2', 'x', 'Mérida, Yucatán, México', 0, 0),
    new Contact('Cooperativa 1', '', ['Maíz', 'Cebada'], '5', '10 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('Agricultor 2', '', ['Platano'], '10', '35 Km2', '', 'Teapa, Tabasco, México', 0, 0),
    new Contact('Agricultor 3', '', ['Maíz'], '3', '1,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('Agricultor 4', '', ['Miel'], '8', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('Cooperativa 2', '', ['Maíz', 'Cebada'], '4', '2,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0)
  ];

  get(id: number) {
    return _.cloneDeep(this.contacts[id]);
  }

  store(contact: Contact) {
    this.contacts.push(contact);
  }

  update(id: number, contact: Contact): boolean {

    if (this.contacts.hasOwnProperty(id)) {
      Object.assign(this.contacts[id], contact);
      return true;
    } else {
      return false;
    }
  }
}
