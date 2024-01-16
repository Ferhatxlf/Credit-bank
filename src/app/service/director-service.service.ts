import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';

import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectorServiceService {
  private apiUrl = 'http://localhost:8000';

  // Declare a variable to store the user ID
  compteId!: number;

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService
  ) {
    // Retrieve the user information from localStorage
    const currentUserString = localStorage.getItem('currentUser');

    // Check if currentUserString is not null
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);

      // Check if currentUser exists and has the 'id' property
      if (currentUser && currentUser.id) {
        // Assign the 'id' to the service variable
        this.compteId = currentUser.id;
      } else {
        // Handle the case when the 'id' is not found
        console.error('User ID not found in localStorage');
      }
    } else {
      // Handle the case when 'currentUserString' is null
      console.error('User information not found in localStorage');
    }
  }

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

  acceptFolder(f): Observable<any> {
    console.log('Attempting to accept folder...');
    const receiverId = '1'; // Assuming '1' is the receiver's ID
    const message = `dossier  N : ${f.id} accepter`;

    console.log(f + 'folder');

    // Notify the WebSocket server that the folder was accepted
    console.log('Sending WebSocket message...');
    this.webSocketService.sendMessage(
      this.compteId.toString(),
      f?.assignedCourtier?.id.toString(),
      message
    );

    return this.http
      .put(`${this.apiUrl}/dossiers/${f?.id}/accept/${this.compteId}`, {
        responseType: 'text',
      })
      .pipe(
        tap(() => console.log('success.')),
        catchError((error) => throwError(error))
      );
  }
  rejectFolder(f): Observable<any> {
    const message = `dossier  N : ${f?.id} refuser`;
    console.log('Sending WebSocket message...');
    this.webSocketService.sendMessage(
      this.compteId.toString(),
      f?.assignedCourtier?.id.toString(),
      message
    );
    return this.http.put(
      `${this.apiUrl}/dossiers/${f?.id}/refuse/${this.compteId}`,
      ''
    );
  }

  renvoiyeFolder(f): Observable<any> {
    const message = `dossier  N : ${f.id} renvoyer`;
    console.log('Sending WebSocket message...');
    this.webSocketService.sendMessage(
      this.compteId.toString(),
      f.assignedCourtier.id.toString(),
      message
    );
    return this.http.put(
      `${this.apiUrl}/dossiers/${f.id}/RenvoyerDossier/${this.compteId}`,
      ''
    );
  }
}
