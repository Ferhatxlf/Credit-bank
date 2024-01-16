// WebSocketService.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounce } from 'lodash';
import io from 'socket.io-client';
import { BanquierService, Banquier } from './BanquierService';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  private receivedMessages: any[] = [];
  private debounceConnectBasedOnRole = debounce((userId: string, role: string) => {
    this.connectBasedOnRole(userId, role);
  }, 1000);

  constructor(private banquierService: BanquierService) {
    this.initializeWebSocket();
  }

  initializeWebSocket(): void {
    const storedUser = this.retrieveUserFromLocalStorage();
    if (storedUser) {
      this.connectBasedOnRole(storedUser.id, storedUser.role);
    } else {
      this.banquierService.getBanquier().subscribe((currentUser) => {
        if (currentUser) {
          this.saveUserToLocalStorage(currentUser);
          this.connectBasedOnRole(currentUser.id, currentUser.role);
        }
      });
    }

    this.subscribeToUserChanges();
  }

  private subscribeToUserChanges(): void {
    this.banquierService.getBanquier().subscribe((user) => {
      if (user) {
        this.saveUserToLocalStorage(user);
        this.connectBasedOnRole(user.id, user.role);
      }
    });
  }

  private connectBasedOnRole(userId: string, role: string): void {
    if (this.socket && this.socket.connected) {
      this.disconnect();
    }
    this.socket = io('https://illustrious-lovely-fedora.glitch.me');

    this.socket.on('connect_error', (error: any) => {
      //console.error('WebSocket connection error:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    if (role === 'directeur') {
      this.directorConnect(userId);
    } else if (role === 'courtier') {
      this.courtierConnect(userId);
    }
  }

  directorConnect(directorId: string): void {
    this.socket.emit('directorConnected', directorId);
  }

  courtierConnect(courtierId: string): void {
    this.socket.emit('courtierConnected', courtierId);
  }

  sendMessage(senderId: string, receiverId: string, message: string): void {
    console.log('Sending message:', { senderId, receiverId, message });
    this.socket.emit('sendMessage', { senderId, receiverId, message });
  }

  onMessageReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (data: any) => {
        console.log('Received message:', data);
  
        // Check if the receiverId matches the current user's id
     
          // Push the received data into the receivedMessages array
          this.receivedMessages.push(data);
  
          // Save the updated receivedMessages array to local storage
          localStorage.setItem('receivedMessages', JSON.stringify(this.receivedMessages));
  
          // Notify observers with the received data
          observer.next(data);
        }

   ) });
  }
  
  
  disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  private saveUserToLocalStorage(user: Banquier): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private retrieveUserFromLocalStorage(): Banquier | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
