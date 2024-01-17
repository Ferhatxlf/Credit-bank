import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { WebSocketService } from './websocket.service';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class CourtierServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app';

  //private apiUrl = 'http://localhost:8000';
  private apiUrl = this.apiConfigService.getApiUrl();

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService,
    private apiConfigService: ApiConfigService
  ) {
    this.webSocketService.onMessageReceived().subscribe((data) => {
      console.log('Message received in component:', data);
    });
  }

  getAllDossier(agence_id: number) {
    const headers = this.getHeaders();
    return this.http.get(
      `${this.apiUrl}/dossiers/${agence_id}/dossiersnotassigned`
    );
  }
  
  getDossierEncours(id: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/Encours`);
  }
  
  getDossierTraite(id: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/traitee`);
  }
  
  affecterDossierACourtier(courtierId: number, dossierId: number) {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.apiUrl}/dossiers/assign-dossier/${dossierId}/to-courtier/${courtierId}`,
      null
    ).pipe(
      tap(() => {
        window.location.reload();
        console.log('success.');
      }),
      catchError((error) => throwError(error))
    );
  }
  
  soumettereDossierADirecteur(dossierIds) {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.apiUrl}/dossiers/sendmultipletoDirectreur`,
      dossierIds,
      {
      
        responseType: 'text',
      }
    ).pipe(
      tap(() => {
        window.location.reload();
        console.log('success.');
      }),
      catchError((error) => throwError(error))
    );
  }
  
  downloadFile(dossierId: number, fileName) {
    const headers = this.getHeaders();
    return this.http.get(
      `${this.apiUrl}/dossiers/downloadFile/${dossierId}/${fileName}`
    );
  }
  
  getAllMyFolders(courtierId) {
    const headers = this.getHeaders();
    return this.http.get(
      `${this.apiUrl}/dossiers/courtier/${courtierId}/alldossiers`
    );
  }

  private getHeaders(): HttpHeaders {
    // Retrieve the user object from local storage
    const currentUserString = localStorage.getItem('currentUser');
  
    // Check if currentUserString is not null before parsing
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  
    // Retrieve the token from the user object or set it to an empty string if not present
    const token = currentUser && currentUser.token ? currentUser.token : '';
  
    // Set headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }
  
}
