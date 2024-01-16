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
  isNotified: boolean = false;
  containerNotificationShow: boolean = false;
  constructor(
    location: Location,
    private authService: AuthServiceService,
    private webSocketService: WebSocketService
  ) {
    this.location = location;
  }
  notifications: any[] = [];
  toggleIsNotfied() {
    this.isNotified = false;
    this.containerNotificationShow = !this.containerNotificationShow;
  }

  ngOnInit(): void {
    const storedMessagesString = localStorage.getItem('receivedMessages');
    const currentUserData = localStorage.getItem('currentUser');

    if (storedMessagesString) {
      if (currentUserData) {
        this.currentUser = JSON.parse(currentUserData);
      }

      const storedMessages = JSON.parse(storedMessagesString);
      storedMessages.forEach((message: any) => {
        console.log(message.receiverId + 'id reciver');
        console.log(this.currentUser.id + 'curent user');
        // Check if receiverId is defined and matches the current user's id
        if (message.receiverId && message.receiverId == this.currentUser.id) {
          this.notifications.push(message.message);
          this.isNotified = true;
        }
      });
    }

    this.webSocketService.onMessageReceived().subscribe((message) => {
      console.log('Received message:', message);
      if (currentUserData) {
        this.currentUser = JSON.parse(currentUserData);
      }

      // Check if the receiverId matches the current user's id
      if (message.receiverId === this.currentUser.id) {
        // Push the individual message into the notifications array
        this.notifications.push(message.message);
      
      }
    });

    this.listTitles = ROUTES.filter((listTitle: any) => listTitle);

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

  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }
  clearNotifications(): void {
    // Clear notifications in local storage
    localStorage.removeItem('receivedMessages');

    // Clear notifications in the component property
    this.notifications = [];

    // Set isNotified to false
    this.isNotified = false;
  }
}
