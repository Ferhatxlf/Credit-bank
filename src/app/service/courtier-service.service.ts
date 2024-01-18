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
    return this.http.get(
      `${this.apiUrl}/dossiers/${agence_id}/dossiersnotassigned`
    );
  }

  getDossierEncours(id: number) {
    return this.http.get(`${this.apiUrl}/dossiers/courtier/${id}/Encours`);
  }
  getDossierTraite(id: number) {
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
    return this.http.get(
      `${this.apiUrl}/dossiers/downloadFile/${dossierId}/${fileName}`
    );
  }

  getAllMyFolders(courtierId) {
    return this.http.get(
      `${this.apiUrl}/dossiers/courtier/${courtierId}/alldossiers`
    );
  }

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
}
