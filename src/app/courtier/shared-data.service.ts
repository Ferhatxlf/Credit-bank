// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private folderData = new BehaviorSubject<any>(null);
  currentFolderData = this.folderData.asObservable();

  constructor() {}

  setFolderData(data: any) {
    this.folderData = data;
  }

  getFolderData() {
    return this.folderData;
  }
}
