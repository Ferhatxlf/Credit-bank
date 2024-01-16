import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  private apiUrl = 'https://unique-zinc-production.up.railway.app';
  constructor(public http: HttpClient) {}

  getDossier(client_id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/client/${client_id}`);
  }

  sendFolder(dossierId: number) {
    return this.http.post(
      `${this.apiUrl}/dossiers/assign-agency/${dossierId}`,
      null
    );
  }

  deleteFile(name, dossierId) {
    return this.http.delete(
      `${this.apiUrl}/dossiers/${dossierId}/files/${name}`
    );
  }
}
