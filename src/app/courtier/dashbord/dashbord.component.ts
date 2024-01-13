import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent implements OnInit {
  currentUser: any;
  public Folders: any = [];
  public myFolders: any = [];

  constructor(private courtierService: CourtierServiceService) {}
  ngOnInit(): void {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
      (rs) => {
        this.Folders = rs;
        console.log(this.Folders);
      },
      (err) => console.log(err)
    );

    this.courtierService.getAllMyFolders(this.currentUser.id).subscribe(
      (rs) => {
        this.myFolders = rs;
        console.log(this.Folders);
      },
      (err) => console.log(err)
    );
  }
}
