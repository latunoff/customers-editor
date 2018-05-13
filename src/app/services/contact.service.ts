import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from '../models/Contact';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ObserveOnMessage } from 'rxjs/operators/observeOn';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application.json' })
};

@Injectable()
export class ContactService {
  private contactUrl = 'api/contacts';

  constructor(
    private http: HttpClient) { }

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactUrl}/${id}`;
    return this.http.get<Contact>(url)
      .pipe(tap(_ => this.log(`fetched contact id = ${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`)));
  }

  getContacts(): Observable<Contact[]> {
    this.log('fetched contacts');
    return this.http.get<Contact[]>(this.contactUrl)
      .pipe(tap(contacts => this.log(`fetched contacts`)),
      catchError(this.handleError('getContacts', [])));
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactUrl, contact, httpOptions)
      .pipe(tap(_ => this.log(`updated contact ${contact.id}`)),
      catchError(this.handleError<any>('updateContact')));
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactUrl, contact, httpOptions)
      // TODO: fix shadowed var error from TSLint; maybe add fields for additional contact info submission
      .pipe(tap((contact: Contact) => this.log(`added contact id = ${contact.id}`)),
      catchError(this.handleError<Contact>('addContact')));
  }

  deleteContact(contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactUrl}/${id}`;

    return this.http.delete<Contact>(url, httpOptions)
      .pipe(tap(_ => this.log(`deleted contact id = ${id}`)),
      catchError(this.handleError<Contact>('deleteContact')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    
  }
}
