import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Contact } from '../../models/Contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location) { }

  ngOnInit() {
    this.getContact();
  }

  getContact(): void {
    // route.snapshot is a static image of the route information shortly after the component was created
    // paramMap is a dictionary of route parameter values extracted from the URL
    // +this.route.snapshot  - the plus sign converts number to string
    const contactId = +this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(contactId)
      .subscribe(contact => this.contact = contact);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.contactService.updateContact(this.contact)
      .subscribe(() => this.goBack());
  }

}
