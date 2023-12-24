import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  public selected: boolean = true;
  public cselected: boolean = false;
  public dselected: boolean = false;
  public pselected: boolean = false;
  constructor(private location: Location) {
    this.url = this.location.path();
    // Écouter les changements d'URL
    this.location.onUrlChange((url) => {
      this.url = url;
      console.log(this.url);
    });
  }
  url: string = '';

  ngOnInit() {}

  goBack(): void {
    this.location.back();
  }

  dashboardSelected() {
    this.selected = true;
    this.cselected = false;
    this.dselected = false;
    this.pselected = false;
  }

  creditSelected() {
    this.selected = false;
    this.cselected = true;
    this.dselected = false;
    this.pselected = false;
  }

  dossierSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = true;
    this.pselected = false;
  }

  profileSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = false;
    this.pselected = true;
  }
}
