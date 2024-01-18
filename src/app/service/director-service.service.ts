import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  forkJoin,
  throwError,
} from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { ApiConfigService } from './ApiConfig.service';

@Injectable({
  providedIn: 'root',
})
export class DirectorServiceService {
  private apiUrl = this.apiConfigService.getApiUrl();

  // Declare a variable to store the user ID
  compteId!: number;

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService,
    private apiConfigService: ApiConfigService
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

  async acceptFolder(folders): Promise<Observable<any>> {
    const acceptStatus = 'refuse'; // Consider renaming to something more appropriate

    try {
      // Execute WebSocket message
      await this.sendWebSocketMessages(folders, acceptStatus);

      const Ids = folders.map((f) => f.id);

      return this.http
        .post(`${this.apiUrl}/dossiers/updateStatusToAccepter`, Ids, {
          responseType: 'text',
        })
        .pipe(
          tap(() => {
            // window.location.reload();
            console.log('success.');
          }),
          catchError((error) => throwError(error))
        );
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
      return throwError(error); // You can modify this as per your error handling strategy
    }
  }

  async rejectFolder(folders): Promise<any> {
    try {
      const Ids = folders.map((f) => f.id);

      // Execute HTTP request
      await this.http
        .post(`${this.apiUrl}/dossiers/updateStatusToRefuser`, Ids, {
          responseType: 'text',
        })
        .toPromise();

      console.log('HTTP request success.');

      // Corrected placement of Status variable
      const Status = 'refuse';

      // Execute WebSocket message
      await this.sendWebSocketMessages(folders, Status);

      // Wait for a moment (you can adjust the duration)
      await this.delay(100);

      // Reload the page
      // window.location.reload();

      console.log('Page reloaded.');
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      return throwError(error);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async renvoiyeFolder(folders): Promise<Observable<any>> {
    try {
      const Ids = folders.map((f) => f.id);
      const Status = 'renvoyer';
      // Execute WebSocket message
      await this.sendWebSocketMessages(folders, Status);

      return this.http
        .post(`${this.apiUrl}/dossiers/updateStatusToRenvoyer`, Ids, {
          responseType: 'text',
        })
        .pipe(
          tap(() => {
            // window.location.reload();
            console.log('success.');
          }),
          catchError((error) => throwError(error))
        );
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
      return throwError(error);
    }
  }

  private async sendWebSocketMessages(folders, Status): Promise<void> {
    for (const folder of folders) {
      const id = folder.id;
      const assignedCourtierId = folder.assignedCourtier?.id;

      if (id && assignedCourtierId && this.compteId) {
        const message = `Dossier N : ${id} ${Status}`;
        await this.webSocketService.sendMessage(
          this.compteId.toString(),
          assignedCourtierId.toString(),
          message
        );
        console.log('WebSocket message sent for dossier:', id);
      }
    }
  }

  addComment(comment, id) {
    return this.http
      .post(
        `${this.apiUrl}/dossiers/${id}/addComment/${this.compteId}`,
        comment,
        {
          responseType: 'text',
        }
      )
      .pipe(
        tap(() => console.log('success.')),
        catchError((error) => throwError(error))
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
