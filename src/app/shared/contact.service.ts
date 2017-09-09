import * as _ from 'lodash';
import { Contact } from '../directory/contact.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ContactService {
  public contactsChange = new EventEmitter<{}>();
  private contacts: Contact[] = [
    new Contact('0', 'Agricultor 1', 'x', ['Miel'], '2', '1 Km2', 'x', 'Mérida, Yucatán, México', 0, 0),
    new Contact('1', 'Cooperativa 1', '', ['Maíz', 'Cebada'], '5', '10 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('2', 'Agricultor 2', '', ['Platano'], '10', '35 Km2', '', 'Teapa, Tabasco, México', 0, 0),
    new Contact('3', 'Agricultor 3', '', ['Maíz'], '3', '1,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('4', 'Agricultor 4', '', ['Miel'], '8', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('5', 'Cooperativa 2', '', ['Maíz', 'Cebada'], '4', '2,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('6', 'Agricultor 1', 'x', ['Miel'], '2', '1 Km2', 'x', 'Mérida, Yucatán, México', 0, 0),
    new Contact('7', 'Cooperativa 1', '', ['Maíz', 'Cebada'], '5', '10 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('8', 'Agricultor 2', '', ['Platano'], '10', '35 Km2', '', 'Teapa, Tabasco, México', 0, 0),
    new Contact('9', 'Agricultor 3', '', ['Maíz'], '3', '1,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('10', 'Agricultor 4', '', ['Miel'], '8', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('11', 'Cooperativa 2', '', ['Maíz', 'Cebada'], '4', '2,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('12', 'Agricultor 1', 'x', ['Miel'], '2', '1 Km2', 'x', 'Mérida, Yucatán, México', 0, 0),
    new Contact('13', 'Cooperativa 1', '', ['Maíz', 'Cebada'], '5', '10 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('14', 'Agricultor 2', '', ['Platano'], '10', '35 Km2', '', 'Teapa, Tabasco, México', 0, 0),
    new Contact('15', 'Agricultor 3', '', ['Maíz'], '3', '1,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('16', 'Agricultor 4', '', ['Miel'], '8', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('17', 'Cooperativa 2', '', ['Maíz', 'Cebada'], '4', '2,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('18', 'Agricultor 1', 'x', ['Miel'], '2', '1 Km2', 'x', 'Mérida, Yucatán, México', 0, 0),
    new Contact('19', 'Cooperativa 1', '', ['Maíz', 'Cebada'], '5', '10 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('20', 'Agricultor 2', '', ['Platano'], '10', '35 Km2', '', 'Teapa, Tabasco, México', 0, 0),
    new Contact('21', 'Agricultor 3', '', ['Maíz'], '3', '1,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('22', 'Agricultor 4', '', ['Miel'], '8', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('23', 'Cooperativa 2', '', ['Maíz', 'Cebada'], '4', '2,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0)
  ];
  private contactsMap = {};

  constructor () {
    console.log('contact service');
    this.getContacts();
  }

  get(id: string) {
    if (!this.contactsMap.hasOwnProperty(id)) {
      return null;
    }
    return _.cloneDeep(this.contactsMap[id]);
  }

  getContactsChunk(offset: number, limit: number) {
    return this.contacts.slice(offset, offset + limit);
  }

  getContacts() {
    this.contactsMap = this.contacts.reduce((result, contact) => {
      if (contact.id === null) {
        console.warn('Contact not added to the map, missing id');
        return result;
      }
      result[contact.id] = contact;
      return result;
    }, {});

    this.contactsChange.emit(this.getContactsMap());

    return this.getContactsMap();
  }

  getContactsCount(): number {
    return this.contacts.length;
  }

  store(contact: Contact) {
    // store and get the id
    contact.id = this.getNewId();
    this.contacts.push(contact);
    this.contactsMap[contact.id] = contact;
    this.contactsChange.emit(this.getContactsMap());
  }

  update(id: string, contact: Contact): boolean {

    if (this.contactsMap.hasOwnProperty(id)) {
      Object.assign(this.contactsMap[id], contact);

      return true;
    } else {
      console.error('update - Contact doesn\'t exists');
      return false;
    }
  }

  remove(id: string) {
    if (this.contactsMap.hasOwnProperty(id)) {
      const contact = this.contactsMap[id];
      const pos = this.contacts.indexOf(contact);
      this.contacts.splice(pos, 1);
      delete this.contactsMap[id];
      this.contactsChange.emit(this.getContactsMap());

      return true;
    } else {
      console.error('remove - Contact doesn\'t exists');
      return false;
    }
  }

  getContactsMap() {
    return _.cloneDeep(this.contactsMap);
  }

  getNewId() {
    let id;
    if (this.contacts.length > 0) {
      id = +this.contacts[this.contacts.length - 1].id + 1;
    } else {
      id = 0;
    }
    return id;
  }
}
