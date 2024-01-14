import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../../app.component';
import { AuthServiceService } from '../../service/auth-service.service';
import { WebSocketService } from '../../service/websocket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private listTitles!: any[];
  location: Location;
  currentUser: any; // Variable to store user details
  userNin: string | null = null; // Variable to store the National Identification Number
  userRole: string | null = null;
  constructor(
    location: Location,
    private authService: AuthServiceService,
    private webSocketService: WebSocketService
  ) {
    this.location = location;
  }
  notifications: any[] = [];

  ngOnInit(): void {
    const storedMessagesString = localStorage.getItem('receivedMessages');

    if (storedMessagesString) {
      const storedMessages = JSON.parse(storedMessagesString);
      console.log('All stored messages:', storedMessages); // Log all stored messages
      this.notifications = storedMessages;
    }

  
    this.webSocketService.onMessageReceived().subscribe((message) => {
      console.log('Received message:', message);

      // Check if the receiverId matches the current user's id
      if (message.receiverId === this.currentUser.id) {
        // Push the individual message into the notifications array
        this.notifications.push(message);
      }
    });
  

    this.listTitles = ROUTES.filter((listTitle: any) => listTitle);
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
      // Access the 'nin' property from the currentUser object
      this.userNin = this.currentUser.nin;
      if (this.currentUser.role === 'courtier') {
        this.userRole = 'Chargé de crédit';
      }
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    if (this.listTitles && this.listTitles.length) {
      for (var item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
          return this.listTitles[item].title;
        }
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.authService.logout();
  }

  showDropdown = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }
}
