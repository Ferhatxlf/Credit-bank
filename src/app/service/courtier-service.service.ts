import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { WebSocketService } from './websocket.service';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class CourtierServiceService {

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
    //const headers = this.getHeaders();
    return this.http.get(
      `${this.apiUrl}/dossiers/${agence_id}/dossiersnotassigned`
    );
  }

  getDossierEncours(id: number) {
    //const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/Encours`);
  }

  getDossierTraite(id: number) {
    //const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/traitee`);
  }

  affecterDossierACourtier(courtierId: number, dossierId: number) {
    return this.http
      .post(
        `${this.apiUrl}/dossiers/assign-dossier/${dossierId}/to-courtier/${courtierId}`,
        null
      )
      .pipe(
        tap(() => {
          // window.location.reload();
          console.log('success.');
        }),
        catchError((error) => throwError(error))
      );
  }

  soumettereDossierADirecteur(dossierIds) {
    //const headers = this.getHeaders();
    return this.http
      .post(`${this.apiUrl}/dossiers/sendmultipletoDirectreur`, dossierIds, {
        responseType: 'text',
      })
      .pipe(
        tap(() => {
          // window.location.reload();
          console.log('success.');
        }),
        catchError((error) => throwError(error))
      );
  }

  downloadFile(dossierId: number, fileName) {
    //const headers = this.getHeaders();
    return this.http.get(
      `${this.apiUrl}/dossiers/downloadFile/${dossierId}/${fileName}`,
     
    );
  }

  getAllMyFolders(courtierId) {
    //const headers = this.getHeaders();
    return this.http.get(
      `${this.apiUrl}/dossiers/courtier/${courtierId}/alldossiers`,
     
    );
  }

  /*  private getHeaders(): HttpHeaders {
    // Retrieve the user object from local storage
    const currentUserString = localStorage.getItem('currentUser');

    // Check if currentUserString is not null before parsing
    const currentUser = currentUserString
      ? JSON.parse(currentUserString)
      : null;

    // Retrieve the token from the user object or set it to an empty string if not present
    const token = currentUser && currentUser.token ? currentUser.token : '';

    // Set headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
    });
  } */
  // pour updater les conteur de la sidebar:
  private FolderList = new BehaviorSubject<string>(''); // Initialisez avec une chaîne vide
  folderList$: Observable<string> = this.FolderList.asObservable();

  updateFolderList(chaine: string) {
    this.FolderList.next(chaine);
  }
  private loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  annoncerLoading(loading: boolean) {
    this.loading.next(loading);
  }


  addComment(comment, selectedFolder) {
    //const headers = this.getHeaders();
    console.log("selectedFolder",selectedFolder)
    console.log("selectedFolder.directeurAgence.id",selectedFolder.assignedCourtier.id)
    return this.http
      .post(
        `${this.apiUrl}/dossiers/${selectedFolder.id}/addComment/${selectedFolder.assignedCourtier.id}`,
        comment,
        { responseType: 'text' }
      )
      .pipe(
        tap(() => console.log('success.')),
        catchError((error) => throwError(error))
      );
  }
}
