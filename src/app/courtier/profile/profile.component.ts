import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../service/client-service.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { CourtierServiceService } from '../../service/courtier-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  information: boolean = false;

  currentUser: any;
  public Folders: any = [];
  constructor(private courtierService: CourtierServiceService) {}
  ngOnInit(): void {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.courtierService.getMyDossier(this.currentUser.id).subscribe(
      (rs) => {
        this.Folders = rs;
        console.log(this.Folders);
      },
      (err) => console.log(err)
    );
  }
}
