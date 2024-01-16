import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { WebSocketService } from './websocket.service';
import { BanquierService, Banquier } from './BanquierService';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://unique-zinc-production.up.railway.app';
  // private apiUrl = 'http://localhost:8000';
  private userRole: string = ''; // Stockez le rôle de l'utilisateur ici

  constructor(
    public http: HttpClient,
    private router: Router,
    private webSocketService: WebSocketService,
    private banquierService: BanquierService
  ) {}

  // inscription ...

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

  // recuperer les info dun client
  getClient(client_id) {
    return this.http.get(`${this.apiUrl}/clients/${client_id}`);
  }
  getBanquier(id) {
    return this.http.get(`${this.apiUrl}/clients/${id}`);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('idDossier');
    this.banquierService.clearBanquier();
    this.webSocketService.disconnect();
    this.router.navigate(['/home']);
  }
}
