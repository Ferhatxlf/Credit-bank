// shared-data.service.ts
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourtierServiceService } from '../service/courtier-service.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  public allDossier: any = [];
  public mesDossier: any = [];
  private currentUser!: any;
  private folderData = new BehaviorSubject<any>(null);
  currentFolderData = this.folderData.asObservable();

  constructor(private courtierService: CourtierServiceService) {}

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
    this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
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
    this.courtierService.getMyDossier(this.currentUser.id).subscribe(
      (rs) => {
        this.mesDossier = rs;
        console.log(this.mesDossier);
      },
      (err) => console.log(err)
    );
  }
}
