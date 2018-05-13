import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Contact } from '../../models/Contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomersComponent implements OnInit {
  customers: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts()
      .subscribe(customers => this.customers = customers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.contactService.addContact({ name } as Contact)
      .subscribe(contact => {
        this.customers.push(contact);
      });
  }

  delete(contact: Contact): void {
    this.customers = this.customers.filter(c => c !== contact);
    this.contactService.deleteContact(contact).subscribe();
  }
}
