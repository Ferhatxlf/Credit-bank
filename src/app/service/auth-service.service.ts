import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8000';
  constructor(public http: HttpClient) {}

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

  // Connexion ....
  login(client: any): Observable<any> {
    console.log('client', client);
    return this.http.post(`${this.apiUrl}/clients/login`, client);
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
}
