import { Component, OnInit } from '@angular/core';
import { DirectorServiceService } from '../../service/director-service.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent implements OnInit {
  currentUser: any;
  Folders: any;
  F: any;
  constructor(private directeurService: DirectorServiceService) {}
  ngOnInit(): void {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.directeurService
      .getAllDossierForDirector(this.currentUser.agence_id)
      .subscribe(
        (rs) => {
          this.Folders = rs;
          this.Folders = this.Folders.filter(
            (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
          );
          this.F = this.Folders;
          console.log(this.Folders);
        },
        (err) => console.log(err)
      );
  }
}
