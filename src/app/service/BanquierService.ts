import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiConfigService} from './ApiConfig.service';
export interface Banquier {
  id: string;
  token: string;
  agence_id: string;
  nin: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class BanquierService {
  private banquierSubject: BehaviorSubject<Banquier | null> = new BehaviorSubject<Banquier | null>(null);




  setBanquier(banquier: Banquier): void {
    this.banquierSubject.next(banquier);
  }

  getBanquier(): Observable<Banquier | null> {
    return this.banquierSubject.asObservable();
  }

  // This method allows external components to get the current value synchronously
  getBanquierValue(): Banquier | null {
    return this.banquierSubject.value;
  }
  clearBanquier(): void {
    this.banquierSubject.next(null);
  }
}



