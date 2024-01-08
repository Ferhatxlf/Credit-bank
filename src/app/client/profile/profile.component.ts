import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../service/client-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public Folders: any = [];
  constructor(private clientService: ClientServiceService) {}
  ngOnInit(): void {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    this.clientService.getDossier(this.currentUser.id).subscribe(
      (rs) => {
        console.log(rs);
        this.Folders = rs;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
