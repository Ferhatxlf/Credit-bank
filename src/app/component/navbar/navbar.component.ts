import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../../app.component';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private listTitles!: any[];
  location: Location;
  currentUser: any;
  client!: any;
  constructor(location: Location, private authService: AuthServiceService) {
    this.location = location;
  }
  ngOnInit(): void {
    this.listTitles = ROUTES.filter((listTitle: any) => listTitle);
    const a = localStorage.getItem('currentUser');
    /* if (a) {
      this.currentUser = a;
    }
    this.authService.getClient(this.currentUser.id).subscribe((res) => {
      console.log(res);
      this.client = res;
    }); */
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
