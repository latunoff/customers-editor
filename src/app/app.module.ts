import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../app/services/in-memory-data.service';

import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';

import { ContactService } from '../app/services/contact.service';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
