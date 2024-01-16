import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of, throwError } from 'rxjs';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app';
  //private apiUrl = 'http://localhost:8000';
  private apiUrl = this.apiConfigService.getApiUrl();
  constructor(
    public http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getDossier(client_id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/client/${client_id}`);
  }

  sendFolder(dossierId: number) {
    return this.http.post(
      `${this.apiUrl}/dossiers/assign-agency/${dossierId}`,
      null
    );
  }

  /* deleteFile(name, dossierId) {
    return this.http.delete(
      `${this.apiUrl}/dossiers/${dossierId}/files/${name}`
    );
  }*/

  deleteFile(name: string, dossierId: number): Observable<string> {
    const url = `${this.apiUrl}/dossiers/${dossierId}/files/${name}`;

    return this.http.delete(url, { responseType: 'text' }).pipe(
      tap(() => console.log('File deleted successfully.')),
      catchError((error) => throwError(error))
    );
  }
}
