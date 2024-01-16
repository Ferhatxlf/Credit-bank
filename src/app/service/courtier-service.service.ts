import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from './websocket.service';
@Injectable({
  providedIn: 'root',
})
export class CourtierServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app';

  private apiUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.onMessageReceived().subscribe((data) => {
      console.log('Message received in component:', data);
    });
  }

  getAllDossier(agence_id: number) {
    return this.http.get(
      `${this.apiUrl}/dossiers/${agence_id}/dossiersnotassigned`
    );
  }

  getDossierEncours(id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/Encours`);
  }
  getDossierTraite(id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/traitee`);
  }

  affecterDossierACourtier(courtierId: number, dossierId: number) {
    return this.http.post(
      `${this.apiUrl}/dossiers/assign-dossier/${dossierId}/to-courtier/${courtierId}`,
      null
    );
  }

  soumettereDossierADirecteur(dossierIds) {
    return this.http.post(
      `${this.apiUrl}/dossiers/sendmultipletoDirectreur`,
      dossierIds
    );
  }

  downloadFile(dossierId: number, fileName) {
    return this.http.get(
      `${this.apiUrl}/dossiers/downloadFile/${dossierId}/${fileName}`
    );
  }

  getAllMyFolders(courtierId) {
    return this.http.get(
      `${this.apiUrl}/dossiers/courtier/${courtierId}/alldossiers`
    );
  }
}
