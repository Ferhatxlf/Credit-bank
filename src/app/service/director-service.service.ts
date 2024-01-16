import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from './websocket.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DirectorServiceService {
  private apiUrl = 'https://unique-zinc-production.up.railway.app';

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
    const message = `dossiers id : ${f.id} accepter`;

    // Notify the WebSocket server that the folder was accepted
    console.log('Sending WebSocket message...');
    this.webSocketService.sendMessage(
      this.compteId.toString(),
      f.assignedCourtier.id.toString(),
      message
    );
    return this.http.put(`${this.apiUrl}/dossiers/${f.id}/accept`, {
      dossier: f,
      idCompte: this.compteId,
    });
  }
  rejectFolder(f) {
    return this.http.put(`${this.apiUrl}/dossiers/${f.id}/refuse`, {
      dossier: f,
      idCompte: this.compteId,
    });
  }

  renvoiyeFolder(f) {
    return this.http.put(
      `${this.apiUrl}/dossiers/${f.id}/RenvoyerDossier/${this.compteId}`,
      {
        dossier: f,
      }
    );
  }
}
