import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-directorlayout',
  templateUrl: './directorlayout.component.html',
  styleUrl: './directorlayout.component.css',
})
export class DirectorlayoutComponent {
  public selected: boolean = false;
  public cselected: boolean = false;
  public dselected: boolean = false;
  public pselected: boolean = false;
  public clientselected: boolean = false;

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
    this.clientselected = false;
    this.pselected = false;
  }

  creditSelected() {
    this.selected = false;
    this.cselected = true;
    this.dselected = false;
    this.clientselected = false;
    this.pselected = false;
  }

  dossierSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = true;
    this.clientselected = false;
    this.pselected = false;
  }

  profileSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = false;
    this.clientselected = false;
    this.pselected = true;
  }
  clienttSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = false;
    this.clientselected = true;
    this.pselected = false;
  }
}
