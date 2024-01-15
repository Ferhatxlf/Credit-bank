import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  // private apiUrl = 'https://unique-zinc-production.up.railway.app/';
  private apiUrl = 'http://localhost:8000';
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
  }/*
  deleteFile(name: string, dossierId: number): Observable<any> {
    const url = `${this.apiUrl}/dossiers/${dossierId}/files/${name}`;

    return this.http.delete(url).pipe(
      map(() => 'File deleted successfully.'),
      tap(
        () => console.log('File deleted successfully.'),
        error => console.error('Delete file error:', error)
      ),
      catchError(error => throwError(error))
    );
  }*/
}
