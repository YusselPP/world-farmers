import { Contact } from '../directory/contact.model';

export class ContactService {
  contacts: Contact[] = [
    new Contact('Agricultor', 'Agricultor 1', '', ['Miel'], '2', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('Cooperativa', 'Cooperativa 1', '', ['Maíz', 'Cebada'], '5', '10 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('Agricultor', 'Agricultor 2', '', ['Platano'], '10', '35 Km2', '', 'Teapa, Tabasco, México', 0, 0),
    new Contact('Agricultor', 'Agricultor 3', '', ['Maíz'], '3', '1,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0),
    new Contact('Agricultor', 'Agricultor 4', '', ['Miel'], '8', '1 Km2', '', 'Mérida, Yucatán, México', 0, 0),
    new Contact('Cooperativa', 'Cooperativa 2', '', ['Maíz', 'Cebada'], '4', '2,000 Km2', '', 'Irapuato, Guanajuato, México', 0, 0)
  ];
}
