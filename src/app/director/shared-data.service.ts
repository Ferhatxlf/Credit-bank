// shared-data.service.ts
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DirectorServiceService } from '../service/director-service.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  public allDossier: any = [];
  public mesDossier: any = [];
  private currentUser!: any;
  private folderData = new BehaviorSubject<any>(null);
  currentFolderData = this.folderData.asObservable();

  constructor(private directorService: DirectorServiceService) {}

  setFolderData(data: any) {
    this.folderData = data;
  }

  getFolderData() {
    return this.folderData;
  }

  getAllDossier() {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.directorService
      .getAllDossierForDirector(this.currentUser.agence_id)
      .subscribe(
        (rs) => {
          this.allDossier = rs;
          console.log(this.allDossier);
        },
        (err) => console.log(err)
      );
  }

  getMyFolders() {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.directorService.getMyDossier(this.currentUser.id).subscribe(
      (rs) => {
        this.mesDossier = rs;
        console.log(this.mesDossier);
      },
      (err) => console.log(err)
    );
  }

  affectation(id_dossier) {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }

    this.directorService
      .affecterDossierACourtier(this.currentUser.id, id_dossier)
      .subscribe(
        (rs) => {
          console.log('sa marche');
        },
        (err) => console.log('erreur', err)
      );
  }
}
