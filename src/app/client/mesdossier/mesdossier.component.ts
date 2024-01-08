import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { ClientServiceService } from '../../service/client-service.service.js';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service.js';

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
    private router: Router,
    private sharedData: SharedDataService
  ) {}
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

  folderClicked(folder) {
    localStorage.setItem('idDossier', folder.id);
    this.router.navigate(['/client/detail-dossier']);
  }
}
