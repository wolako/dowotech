import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
//import { environment } from '../../environments/environment';      

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'https://dowotech.com/api';

  constructor(private http: HttpClient) {
      console.log("API URL utilisée :", this.baseUrl);
  }

  addContact(contact: any): Observable<any> {
   const headers = { 'Content-Type': 'application/json' };
   return this.http.post<any>(`${this.baseUrl}/contacts`, contact, { headers }
   ).pipe(
       catchError(this.handleError)
   );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API:', error);
    if (error.error instanceof ErrorEvent) {
           // Erreur côté client
      console.error('Erreur côté client:', error.error.message);
    } else {
        // Erreur côté serveur
      console.error(`Code HTTP: ${error.status}, Message: ${error.message}`);
    }
    return throwError('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard.');
  }
}