import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class SimulationServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app';
 // private apiUrl = 'http://localhost:8000';
  private  apiUrl = this.apiConfigService.getApiUrl();
  constructor(public http: HttpClient,  private apiConfigService: ApiConfigService) {}

  private loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  annoncerLoading(loading: boolean) {
    this.loading.next(loading);
  }

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

  addDocument(id: number, files: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/dossiers/${id}/files`, files);
  }

  getDossier(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dossiers/${id}`);
  }
}
