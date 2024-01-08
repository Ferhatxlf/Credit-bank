import { Component } from '@angular/core';

import { Location } from '@angular/common';

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

  folderValue: any;
  haveCourtier: boolean = false;
  constructor(private location: Location) {
    this.url = this.location.path();
  }

  url: string = '';

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {}

  goInfo() {
    this.info = true;
    this.credit = false;
    this.client = false;
    this.docs = false;
  }
  goCredit() {
    this.info = false;
    this.credit = true;
    this.client = false;
    this.docs = false;
  }
  goClient() {
    this.info = false;
    this.credit = false;
    this.client = true;
    this.docs = false;
  }
  goDoc() {
    this.info = false;
    this.credit = false;
    this.client = false;
    this.docs = true;
  }
}
