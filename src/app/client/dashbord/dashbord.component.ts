import { Component } from '@angular/core';
import { ClientServiceService } from '../../service/client-service.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent {
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
