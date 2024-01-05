import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CourtierServiceService {
  private apiUrl = 'http://localhost:8000';
  constructor(public http: HttpClient) {}

  getAllDossier(agence_id: number) {
    return this.http.get(
      `${this.apiUrl}/dossiers/${agence_id}/dossiersnotassigned`
    );
  }

  getMyDossier(id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/traitee`);
  }
}
