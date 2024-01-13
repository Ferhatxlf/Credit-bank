import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;

  constructor() {
    this.initializeWebSocket();
  }

  private initializeWebSocket(): void {
    const currentUser = this.getCurrentUserFromLocalStorage();
    if (currentUser) {
      this.connectBasedOnRole(currentUser.id, currentUser.role);
    }

    this.subscribeToUserChanges();
  }

  private getCurrentUserFromLocalStorage(): any {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  private subscribeToUserChanges(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'currentUser') {
        const updatedUser = this.getCurrentUserFromLocalStorage();
        if (updatedUser) {
          this.connectBasedOnRole(updatedUser.id, updatedUser.role);
        } else {
          this.disconnect(); // Disconnect on user removal (logout)
        }
      }
    });
  }

  private connectBasedOnRole(userId: string, role: string): void {
    this.socket = io('http://localhost:9000');

    if (role === 'directeur' || role === 'courtier') {
      this.directorOrCourtierConnect(userId);
    }
    // Add more conditions for other roles if needed

    // Handle socket disconnection
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      // Perform any cleanup or additional actions as needed
    });
  }

  private directorOrCourtierConnect(userId: string): void {
    this.socket.emit('directorOrCourtierConnected', userId);
  }

  sendMessage(senderId: string, receiverId: string, message: string): void {
    console.log('Sending message:', { senderId, receiverId, message });
    this.socket.emit('sendMessage', { senderId, receiverId, message });
  }

  onMessageReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (data: any) => {
        console.log('Received message:', data);
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
