import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SimulationServiceService {
  private apiUrl = 'http://localhost:8000';
  constructor(public http: HttpClient) {}

  addDossier(dossier: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      `${this.apiUrl}/dossiers/adddossier`,
      dossier,
      httpOptions
    );
  }

  addDocument(id: any, files: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
    return this.http.post(
      `${this.apiUrl}/dossiers/${id}/files`,
      files,
      httpOptions
    );
  }
}
