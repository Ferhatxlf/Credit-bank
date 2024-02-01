import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { Observable, Subject, of, throwError } from 'rxjs';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app';
  //private apiUrl = 'http://localhost:8000';
  private apiUrl = this.apiConfigService.getApiUrl();
  constructor(
    public http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}
  private loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  annoncerLoading(loading: boolean) {
    this.loading.next(loading);
  }

  getDossier(client_id: number) {
    const url = `${this.apiUrl}/dossiers/client/${client_id}`;
    return this.http.get(url);
  }

  sendFolder(dossierId: number) {
    return this.http.post(
      `${this.apiUrl}/dossiers/assign-agency/${dossierId}`,
      null
    );
  }

  /* deleteFile(name, dossierId) {
    return this.http.delete(
      `${this.apiUrl}/dossiers/${dossierId}/files/${name}`
    );
  }*/

  deleteFile(name: string, dossierId: number): Observable<string> {
    const url = `${this.apiUrl}/dossiers/${dossierId}/files/${name}`;

    return this.http.delete(url, { responseType: 'text' }).pipe(
      tap(() => {
        // window.location.reload();
        console.log('File deleted successfully.');
      }),
      catchError((error) => throwError(error))
    );
  }

  // sendAnOtherEmail(recipientEmail: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   return this.http
  //     .post(
  //       `${this.apiUrl}/clients/send-confirmation-email`,
  //       recipientEmail,
  //       httpOptions
  //     )
  //     .pipe(
  //       tap(() => {
  //         console.log('Email sent successfully.');
  //       }),
  //       catchError((error) => {
  //         console.error('Error sending email:', error);
  //         return throwError(error);
  //       })
  //     );
  // }
  sendAnOtherEmail(recipientEmail: any): Observable<any> {
    console.log('recipientEmail=' + recipientEmail);
    const email = recipientEmail;

    const payload = { recipientEmail: email }; // Sending only the email address
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(`${this.apiUrl}/clients/send-confirmation-email`, payload, {
        headers,
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          console.error('Error sending confirmation email:', error);
          return throwError(error);
        })
      );
  }

  setPassword(data, id) {
    const url = `${this.apiUrl}/clients/${id}/reset-password`;

    return this.http.put(url, data, { responseType: 'text' }).pipe(
      tap(() => {
        // window.location.reload();
        console.log('password updated successfully.');
      }),
      catchError((error) => throwError(error))
    );
  }

  forgetPassword(email) {
    const url = `${this.apiUrl}/clients/reset-password`;

    return this.http.put(url, email, { responseType: 'text' }).pipe(
      tap(() => {
        // window.location.reload();
        console.log('password updated successfully.');
      }),
      catchError((error) => throwError(error))
    );
  }

  updateProfile(id, data) {
    const url = `${this.apiUrl}/clients/updateparticulier/${id}`;

    console.log('data' + data);

    return this.http.put(url, data, { responseType: 'text' }).pipe(
      tap(() => {
        // window.location.reload();
        console.log('client updated successfully.');
      }),
      catchError((error) => throwError(error))
    );
  }
  /*  private getHeaders(): HttpHeaders {
    // Retrieve the user object from local storage
    const currentUserString = localStorage.getItem('currentUser');

    // Check if currentUserString is not null before parsing
    const currentUser = currentUserString
      ? JSON.parse(currentUserString)
      : null;

    // Retrieve the token from the user object or set it to an empty string if not present
    const token = currentUser && currentUser.token ? currentUser.token : '';

    // Set headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
  } */

  getAllCommunes(): Observable<any> {
    const endpoint = '/agence-commune'; // Replace with your actual API endpoint
    return this.http.get<any>(`${this.apiUrl}${endpoint}`);
  }
}
