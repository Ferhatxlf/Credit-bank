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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
