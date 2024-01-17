import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { ClientServiceService } from '../../service/client-service.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesdossier',
  templateUrl: './mesdossier.component.html',
  styleUrl: './mesdossier.component.css',
})
export class MesdossierComponent implements OnInit {
  currentUser: any;
  public Folders: any = [];
  constructor(
    private clientService: ClientServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const a = localStorage.getItem('currentUser');
    this.clientService.annoncerLoading(true);

    if (a) {
      this.currentUser = JSON.parse(a);
    }
    this.clientService.getDossier(this.currentUser.id).subscribe(
      (rs) => {
        setTimeout(() => {
          this.clientService.annoncerLoading(false);
        }, 1000);
        console.log(rs);

        this.Folders = rs;
      },
      (err) => {
        console.log(err);
        setTimeout(() => {
          this.clientService.annoncerLoading(false);
        }, 1000);
      }
    );
  }

  folderClicked(folder) {
    localStorage.setItem('idDossier', folder.id);
    this.router.navigate(['/client/detail-dossier', folder.id]);
  }
  sendFolder(id) {
    this.clientService.sendFolder(id).subscribe(
      (rs) => {
        console.log(rs);
      },
      (err) => console.log(err)
    );
  }
}
