import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../../app.component';

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
  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    this.listTitles = ROUTES.filter((listTitle: any) => listTitle);
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
      // Access the 'nin' property from the currentUser object
      this.userNin = this.currentUser.nin; 
      this.userRole=this.currentUser.role
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
