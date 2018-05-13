import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from '../app/components/customers/customers.component';
import { ContactDetailComponent } from '../app/components/contact-detail/contact-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersComponent },
  { path: 'detail/:id', component: ContactDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
