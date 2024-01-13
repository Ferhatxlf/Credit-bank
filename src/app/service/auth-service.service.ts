import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8000';
  private userRole: string = ''; // Stockez le rôle de l'utilisateur ici

  constructor(public http: HttpClient, private router: Router) {}

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

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('idDossier');
    this.router.navigate(['/home']);
  }
}
