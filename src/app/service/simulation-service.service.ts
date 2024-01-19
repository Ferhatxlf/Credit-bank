import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class SimulationServiceService {

  private  apiUrl = this.apiConfigService.getApiUrl();
  constructor(public http: HttpClient,  private apiConfigService: ApiConfigService) {}

  private loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  annoncerLoading(loading: boolean) {
    this.loading.next(loading);
  }

  addDossier(dossier: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.apiUrl}/dossiers/adddossier`,
      dossier
    );
  }
  
  addDocument(id: number, files: FormData): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.apiUrl}/dossiers/${id}/files`,
      files
    );
  }
  
  getDossier(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/dossiers/${id}`);
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
