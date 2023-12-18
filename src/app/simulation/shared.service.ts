// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private infoSubject = new BehaviorSubject<string>('');

  sendInfo(info: string) {
    this.infoSubject.next(info);
  }

  getInfo() {
    return this.infoSubject.asObservable();
  }
}
