import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { WebSocketService } from './websocket.service';
import { BanquierService, Banquier } from './BanquierService';
import { catchError } from 'rxjs/operators';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app';
  private apiUrl = this.apiConfigService.getApiUrl();
  private userRole: string = ''; // Stockez le rôle de l'utilisateur ici

  constructor(
    public http: HttpClient,
    private router: Router,
    private webSocketService: WebSocketService,
    private banquierService: BanquierService,
    private apiConfigService: ApiConfigService
  ) {}

  register(client: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      `${this.apiUrl}/clients/subscribe/particulier`,
      client,
      httpOptions
    );
  }
  login(client: any): Observable<any> {
    console.log('client', client);
    return this.http.post(`${this.apiUrl}/clients/login`, client).pipe(
      catchError((error) => {
        // Log the detailed error response
        console.error('Login error:', error);

        // Log the detailed error response body if available
        if (error instanceof HttpErrorResponse && error.error) {
          console.error('Error Response Body:', error.error);
        }

        // Throw the error to propagate it to the component
        return throwError(error);
      })
    );
  }
  getCurrentUser(): string | null {
    return localStorage.getItem('curesntUser');
  }

  setCurrentUser(user: string): void {
    localStorage.setItem('curesntUser', user);
  }

  banquierLogin(banquier: any): Observable<any> {
    console.log('banquier', banquier);
    return this.http.post(`${this.apiUrl}/banque/comptes/signin`, banquier);
  }

  getClient(client_id) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/clients/${client_id}`);
  }

  getBanquier(id) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/clients/${id}`);
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('idDossier');
    this.banquierService.clearBanquier();
    this.webSocketService.disconnect();
    this.router.navigate(['/home']);
  }

  private getHeaders(): HttpHeaders {
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
      /* 'Authorization': `Bearer ${token}`, */
    });
  }
}
