import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ClientServiceService } from '../../service/client-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mon-dossier',
  templateUrl: './mon-dossier.component.html',
  styleUrl: './mon-dossier.component.css',
})
export class MonDossierComponent implements OnInit {
  info: boolean = true;
  client: boolean = false;
  docs: boolean = false;
  credit: boolean = false;
  showModal: boolean = false;
  currentUser: any;
  public Folders: any = [];
  idDossier: any;
  isSubmitted: boolean = false;

  folderValue: any;
  haveCourtier: boolean = false;
  constructor(
    private location: Location,
    private clientService: ClientServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.url = this.location.path();
  }

  url: string = '';

  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.clientService.annoncerLoading(true);
    // Récupérer l'ID du dossier depuis l'URL
    this.idDossier = this.route.snapshot.paramMap.get('id');
    console.log('iddossier', this.idDossier);
    const a = localStorage.getItem('currentUser');

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

        const matchingFolder = this.Folders.find(
          (folder) => folder.id === Number(this.idDossier)
        );
        console.log('matchingFolder', matchingFolder);

        if (matchingFolder) {
          if (matchingFolder.assignedagence === null) {
            this.isSubmitted = false;
            console.log('is submitted', this.isSubmitted, matchingFolder);
          } else {
            this.isSubmitted = true;
            console.log('is submitted', this.isSubmitted, matchingFolder);
          }
        }
      },
      (err) => {
        console.log(err);
        setTimeout(() => {
          this.clientService.annoncerLoading(false);
        }, 1000);
      }
    );
  }
  toggleShowModale() {
    this.showModal = !this.showModal;
  }
  sendFolder() {
    this.clientService.sendFolder(this.idDossier).subscribe(
      (rs) => {
        console.log('reponse serveur pour sendFolder', rs);
        this.showModal = true;
        this.isSubmitted = true;
      },
      (err) => console.log('erreur send dossier', err)
    );
  }

  goInfo() {
    this.info = true;
    this.credit = false;
    this.client = false;
    this.docs = false;
    this.router.navigate([
      `/client/detail-dossier/${this.idDossier}/information`,
    ]);
  }
  goCredit() {
    this.info = false;
    this.credit = true;
    this.client = false;
    this.docs = false;
    this.router.navigate([
      `/client/detail-dossier/${this.idDossier}/detail-credit`,
    ]);
  }
  goClient() {
    this.info = false;
    this.credit = false;
    this.client = true;
    this.docs = false;
    this.router.navigate([
      `/client/detail-dossier/${this.idDossier}/detail-client`,
    ]);
  }
  goDoc() {
    this.info = false;
    this.credit = false;
    this.client = false;
    this.docs = true;
    this.router.navigate([`/client/detail-dossier/${this.idDossier}/document`]);
  }
}
