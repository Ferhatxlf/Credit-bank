import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private folderData = new BehaviorSubject<any>(null);
  private folderIdSource = new BehaviorSubject<string>('');
  currentFolderId = this.folderIdSource.asObservable();

  setFolderData(data: any) {
    this.folderData = data;
  }

  getFolderData() {
    return this.folderData;
  }

  changeFolderId(folderId: string) {
    this.folderIdSource.next(folderId);
  }

  constructor() {}
}
