// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourtierServiceService } from '../service/courtier-service.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private allDossier: any = [];
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
    this.courtierService.getAllDossier().subscribe(
      (rs) => {
        this.allDossier = rs;
        console.log(this.allDossier);
      },
      (err) => console.log(err)
    );
  }
}
