import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DirectorServiceService {
  private apiUrl = 'http://localhost:8000';
  constructor(public http: HttpClient) {}

  getAllDossierForDirector(agence_id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/agence/${agence_id}`);
  }

  getMyDossier(id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/Encours`);
  }

  /*  affecterDossierACourtier(courtierId: number, dossierId: number) {
    return this.http.post(
      `${this.apiUrl}/dossiers/assign-dossier/${dossierId}/to-courtier/${courtierId}`,
      null
    );
  } */

  acceptFolder(id: number) {
    return this.http.put(`${this.apiUrl}/dossiers/${id}/accept`, null);
  }

  rejectFolder(id: number) {
    return this.http.put(`${this.apiUrl}/dossiers/${id}/refuse`, null);
  }

  renvoiyeFolder(id: number) {
    return this.http.put(
      `${this.apiUrl}/dossiers/${id}/RenvoyerDossier/5`,
      null
    );
  }
}
