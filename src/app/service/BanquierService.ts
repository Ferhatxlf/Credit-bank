import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiConfigService} from './ApiConfig.service';
export interface Banquier {
  id: string;
  token: string;
  agence_id: string;
  nin: string;
  role: string;
}

export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class BanquierService {
  private banquierSubject: BehaviorSubject<Banquier | null> = new BehaviorSubject<Banquier | null>(null);
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);




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

  notifyMessagesReceived(messages: Message[]): void {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [...currentMessages, ...messages];
    this.messagesSubject.next(updatedMessages);
  }

  onMessagesReceived(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  
  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}



