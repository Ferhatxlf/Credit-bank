import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;

  private receivedMessages: any[] = [];
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
          this.disconnect();
        }
      }
    });
  }

  private connectBasedOnRole(userId: string, role: string): void {
    if (this.socket && this.socket.connected) {
      this.disconnect(); // Disconnect before connecting with the new user
    }

    this.socket = io('http://localhost:9000');

    // Handle connection errors
    this.socket.on('connect_error', (error: any) => {
      console.error('WebSocket connection error:', error);
    });

    // Handle disconnection
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      // Perform any cleanup or additional actions as needed
    });

    if (role === 'directeur') {
      this.directorConnect(userId);
    } else if (role === 'courtier') {
      this.courtierConnect(userId);
    }
    // Add more conditions for other roles if needed
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
        this.receivedMessages.push(data);
        localStorage.setItem('receivedMessages', JSON.stringify(this.receivedMessages));
        observer.next(this.receivedMessages);
      });
    });
  }
  

  disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
}
