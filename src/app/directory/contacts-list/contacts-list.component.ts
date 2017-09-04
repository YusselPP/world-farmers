import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[];

  constructor() { }

  ngOnInit() {
    this.contacts = [
      new Contact('Agricultor', 'Agricultor 1', '', ['Miel'], '', '', '', 'Mérida, Yucatán, México', 0, 0),
      new Contact('Cooperativa', 'Cooperativa 1', '', ['Maíz', 'Cebada'], '', '', '', 'Irapuato, Guanajuato, México', 0, 0)
    ]
  }

}
