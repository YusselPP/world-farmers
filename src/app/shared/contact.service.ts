import * as _ from 'lodash';
import { Contact } from '../directory/contact.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../directory/page.interface';

@Injectable()
export class ContactService {
  private static apiBaseUrl = 'http://world-farmers.com/api/';

  public contactsChange = new EventEmitter<{}>();

  private contacts: Contact[] = [];
  private contactsMap = {};
  public contactsCount = 0;


  constructor (private httpClient: HttpClient) {
    console.log('contact service');
  }

  public get(id: string) {
    const url = `${ContactService.apiBaseUrl}contacts/${id}`;

    return this.httpClient.get<Contact>(url)
      .map(contact => new Contact(contact));
  }

  public getContactsPage(pageNum: number, perPage: number) {

    const url = `${ContactService.apiBaseUrl}contacts`;
    const params = new HttpParams()
      .append('page', pageNum.toString())
      .append('per_page', perPage.toString());

    return this.httpClient.get<Page<Contact>>(url, {params: params})
      .do(contactsPage => this.contactsCount = contactsPage.total)
      .map(page => {
        return page.data.map(contact => new Contact(contact)) as Contact[];
      })
      .do(contacts => this.setContacts(contacts));
  }

  public store(contact: Contact) {

    const url = `${ContactService.apiBaseUrl}contacts`;
    const cont =  _.cloneDeep(contact);

    cont.products = cont.products.join(', ');

    return this.httpClient.post(url, cont).do(r => this.contactsCount++);
  }

  public update(id: string, contact: Contact) {

    const url = `${ContactService.apiBaseUrl}contacts/${id}`;
    const cont =  _.cloneDeep(contact);

    cont.products = cont.products.join(', ');

    return this.httpClient.put(url, cont);
  }

  public remove(id: string) {
    const url = `${ContactService.apiBaseUrl}contacts/${id}`;

    return this.httpClient.delete(url)
      .do(response => {
        this.contactsCount--;
        this.removeFromView(id);
      });
  }


  /* Private methods */
  private getContacts(): Contact[] {
    return _.cloneDeep(this.contacts);
  }

  private setContacts(contacts: Contact[]) {
    this.contacts.length = 0;
    this.contacts.push(...contacts);
    this.updateContactsMap();
    this.contactsChange.emit(this.getContacts());
  }

  private updateContactsMap() {
    this.contactsMap = this.contacts.reduce((result, contact) => {
      if (contact.id === null) {
        console.warn('Contact not added to the map, missing id');
        return result;
      }
      result[contact.id] = contact;
      return result;
    }, {});
  }

  private removeFromView(id: string) {
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
}
