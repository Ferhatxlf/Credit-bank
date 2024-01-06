import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  private apiUrl = 'http://localhost:8000';
  constructor(public http: HttpClient) {}

  getDossier(client_id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/client/${client_id}`);
  }
}
