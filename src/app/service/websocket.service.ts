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
    console.log("currentUser"+currentUser)
    if (currentUser) {
      this.connectBasedOnRole(currentUser.id, currentUser.role);
    }

    // Assuming you want to reconnect on user changes, you can subscribe to user changes.
    this.subscribeToUserChanges();
  }

  private getCurrentUserFromLocalStorage(): any {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  private subscribeToUserChanges(): void {
    // Assuming you want to reconnect on user changes, you can subscribe to changes in local storage.
    // This is just a simple example; you might need a more sophisticated mechanism based on your application's logic.
    window.addEventListener('storage', (event) => {
      if (event.key === 'currentUser') {
        const updatedUser = this.getCurrentUserFromLocalStorage();
        if (updatedUser) {
          this.connectBasedOnRole(updatedUser.id, updatedUser.role);
        } else {
          // Handle the case when the user is removed from local storage (e.g., logout)
          this.disconnect();
        }
      }
    });
  }

  private connectBasedOnRole(userId: string, role: string): void {
    this.socket = io('http://localhost:9000');

    if (role === 'directeur') {
      this.directorConnect(userId);
    } else if (role === 'courtier') {
      this.courtierConnect(userId);
    }
    // Add more conditions for other roles if needed
  }

  private directorConnect(directorId: string): void {
    this.socket.emit('directorConnected', directorId);
  }

  private courtierConnect(courtierId: string): void {
    this.socket.emit('courtierConnected', courtierId);
  }

  sendMessage(senderId: string, receiverId: string, message: string): void {
    console.log('Sending message:', { senderId, receiverId, message });
    this.socket.emit('sendMessage', { senderId, receiverId, message });
  }

  onMessageReceived(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (data: any) => {
        console.log('Received message:', data); // Log the received message
        observer.next(data);
      });
    });
  }
  

  // Disconnect the socket when needed (e.g., on logout or component destroy)
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
