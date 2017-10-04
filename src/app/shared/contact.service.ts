import * as _ from 'lodash';
import { Contact } from '../directory/contact.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../directory/page.interface';
import LatLngBounds = google.maps.LatLngBounds;
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactService {
  private static apiBaseUrl = 'http://farmersoftheworld.org/api/';

  public contactsChange: EventEmitter<Contact[]> = new EventEmitter();

  private contacts: Contact[] = [];
  private contactsMap = {};
  public contactsCount = 0;


  constructor (private httpClient: HttpClient) {
  }

  public get(id: string) {
    const url = `${ContactService.apiBaseUrl}contacts/${id}`;

    return this.httpClient.get(url, {responseType: 'text'})
      .map(data => JSON.parse(data))
      .map(contact => new Contact(contact));
  }

  public getContactsPage(pageNum: number, perPage: number, bounds?: LatLngBounds, filter?: string, location?) {
    let request: Observable<string>;
    const url = `${ContactService.apiBaseUrl}contacts`;
    let params = new HttpParams()
      .append('page', pageNum.toString())
      .append('per_page', perPage.toString());

    if (bounds) {
      params = params.append('bounds', JSON.stringify(bounds));
    }

    if (filter) {
      params = params.append('filter', JSON.stringify(filter.split(/\s+/).filter(s => s !== '')));
    }

    if (location) {
      params = params.append('location', JSON.stringify(location.split(/[^A-Za-z\u00C0-\u017F]+/).filter(s => s !== '')));
    }

    if (!bounds && !location) {
      request = Observable.of(JSON.stringify({total: 0, data: []}));
    } else {
      request = this.httpClient.get(url, { responseType: 'text', params: params} );
    }

    return request
      .map(data => JSON.parse(data) as Page<Contact>)
      .do(contactsPage => this.contactsCount = contactsPage.total, err => this.contactsCount = 0)
      .map(page => {
        return page.data.map(contact => new Contact(contact)) as Contact[];
      })
      .do(contacts => this.setContacts(contacts), err => this.setContacts([]));
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
      })
      .map(() => this.getContacts());
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
