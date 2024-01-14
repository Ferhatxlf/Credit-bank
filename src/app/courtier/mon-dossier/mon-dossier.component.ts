import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-mon-dossier',
  templateUrl: './mon-dossier.component.html',
  styleUrl: './mon-dossier.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '350px',
          width: '200px',
          backgroundColor: 'white',
          borderRadius: '10px',
          justifyContent: 'start',
          alignItem: 'start',
          color: 'black',
        })
      ),
      state(
        'closed',
        style({
          height: '55px',
          width: '55px',
          backgroundColor: 'green',
        })
      ),
      transition('open <=> closed', [animate('0.6s ease-out')]),
    ]),
  ],
})
export class MonDossierComponent {
  info: boolean = true;
  client: boolean = false;
  docs: boolean = false;
  credit: boolean = false;

  folderValue: any;
  haveCourtier: boolean = false;
  idDossier: any;
  constructor(
    private location: Location,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.url = this.location.path();
  }

  url: string = '';

  goBack(): void {
    this.location.back();
  }
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.idDossier = this.route.snapshot.paramMap.get('id');
    this.folderValue = this.sharedDataService.getFolderData();
    if (this.folderValue.courtier === '') {
      this.haveCourtier = false;
    } else {
      this.haveCourtier = true;
    }
  }

  goInfo() {
    this.info = true;
    this.credit = false;
    this.client = false;
    this.docs = false;
    this.router.navigate([
      `/courtier/detail-dossier/${this.idDossier}/information`,
    ]);
  }
  goCredit() {
    this.info = false;
    this.credit = true;
    this.client = false;
    this.docs = false;
    this.router.navigate([
      `/courtier/detail-dossier/${this.idDossier}/detail-credit`,
    ]);
  }
  goClient() {
    this.info = false;
    this.credit = false;
    this.client = true;
    this.docs = false;
    this.router.navigate([
      `/courtier/detail-dossier/${this.idDossier}/detail-client`,
    ]);
  }
  goDoc() {
    this.info = false;
    this.credit = false;
    this.client = false;
    this.docs = true;

    this.router.navigate([
      `/courtier/detail-dossier/${this.idDossier}/document`,
    ]);
  }
}
