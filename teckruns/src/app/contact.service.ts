import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = '/api/contacts';

  constructor(private http: HttpClient) { }

  addContact(nom: string, prenom: string, email: string, phone: string, services: string, message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { nom, prenom, email, phone, services, message })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Logique de gestion des erreurs
    console.error('An error occurred:', error.error);
    return throwError('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard.');
  }
}
