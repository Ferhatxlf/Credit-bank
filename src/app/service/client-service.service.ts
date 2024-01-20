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
    return this.http.get(`${this.apiUrl}/dossiers/client/${client_id}`);
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

  sendAnOtherEmail(recipientEmail: any): Observable<any> {
    console.log("recipientEmail=" + recipientEmail);
    const email = recipientEmail;
  
    const payload = { recipientEmail: email }; // Sending only the email address
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(`${this.apiUrl}/clients/send-confirmation-email`, payload, { headers, responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error sending confirmation email:', error);
        return throwError(error);
      })
    );
  }
  
  
  }

