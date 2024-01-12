import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mon-dossier',
  templateUrl: './mon-dossier.component.html',
  styleUrl: './mon-dossier.component.css',
})
export class MonDossierComponent {
  info: boolean = true;
  client: boolean = false;
  docs: boolean = false;
  credit: boolean = false;
  id: any;

  folderValue: any;
  haveCourtier: boolean = false;
  constructor(
    private location: Location,
    private sharedDataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.url = this.location.path();
  }

  url: string = '';

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.folderValue = this.sharedDataService.getFolderData();
    if (this.folderValue.courtier === '') {
      this.haveCourtier = false;
    } else {
      this.haveCourtier = true;
    }

    this.id = this.route.snapshot.paramMap.get('id');
  }

  goInfo() {
    this.info = true;
    this.credit = false;
    this.client = false;
    this.docs = false;

    this.router.navigate([`/director/detail-dossier/${this.id}/information`]);
  }
  goCredit() {
    this.info = false;
    this.credit = true;
    this.client = false;
    this.docs = false;

    this.router.navigate([`/director/detail-dossier/${this.id}/detail-credit`]);
  }
  goClient() {
    this.info = false;
    this.credit = false;
    this.client = true;
    this.docs = false;

    this.router.navigate([`/director/detail-dossier/${this.id}/detail-client`]);
  }
  goDoc() {
    this.info = false;
    this.credit = false;
    this.client = false;
    this.docs = true;

    this.router.navigate([`/director/detail-dossier/${this.id}/document`]);
  }
}
