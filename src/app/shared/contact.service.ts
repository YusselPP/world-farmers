import * as _ from 'lodash';
import { Contact } from '../directory/contact.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ContactService {
  public contactsChange = new EventEmitter<{}>();
  private contacts: Contact[] = [];
  private contactsMap = {};
  private contactsCount = 0;

  constructor (private httpClient: HttpClient) {
    console.log('contact service');
  }

  get(id: string) {
    if (!this.contactsMap.hasOwnProperty(id)) {
      return null;
    }
    return _.cloneDeep(this.contactsMap[id]);
  }

  getContactsPage(page: number, perPage: number) {
    this.httpClient.get<any>('http://world-farmers.com/api/contacts', {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('page', page.toString()).append('per_page', perPage.toString()),
      headers: new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
    })
      .map(
        (contactsPage) => {
          console.log(contactsPage);
          for (const contact of contactsPage.data) {
            if (contact['products']) {
              contact['products'] = contact['products'].split(',').map(s => s.trim());
            }
          }
          return contactsPage;
        }
      )
      .subscribe(
        (contactsPage) => {
          this.contactsCount = contactsPage.total;
          this.setContacts(contactsPage.data);
        }
      );
  }

  store(contact: Contact) {
    // store and get the id
    contact.id = this.getNewId();
    this.contacts.push(contact);
    this.contactsMap[contact.id] = contact;
    this.contactsChange.emit(this.getContacts());
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
      this.contactsChange.emit(this.getContacts());

      return true;
    } else {
      console.error('remove - Contact doesn\'t exists');
      return false;
    }
  }

  getContacts() {
    return _.cloneDeep(this.contacts);
  }

  setContacts(contacts: Contact[]) {
    this.contacts.length = 0;
    this.contacts.push(...contacts);
    this.updateContactsMap();
    this.contactsChange.emit(this.getContacts());
  }

  updateContactsMap() {
    this.contactsMap = this.contacts.reduce((result, contact) => {
      if (contact.id === null) {
        console.warn('Contact not added to the map, missing id');
        return result;
      }
      result[contact.id] = contact;
      return result;
    }, {});
  }

  getContactsCount(): number {
    return this.contactsCount;
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
