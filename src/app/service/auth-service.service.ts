import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8080';
  constructor(public http: HttpClient) {}

  // inscription ...
  register(client: any) {
    return this.http.post(
      `${this.apiUrl}/clients/subscribe/particulier`,
      client
    );
  }

  // Connexion ....
  login(client: any) {
    console.log('client', client);
    return this.http.post(`${this.apiUrl}/clients/login`, client);
  }
}
