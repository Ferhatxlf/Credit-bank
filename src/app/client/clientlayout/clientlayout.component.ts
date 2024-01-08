import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientServiceService } from '../../service/client-service.service';

@Component({
  selector: 'app-clientlayout',
  templateUrl: './clientlayout.component.html',
  styleUrl: './clientlayout.component.css',
})
export class ClientlayoutComponent implements OnInit {
  public selected: boolean = false;
  public cselected: boolean = false;
  public dselected: boolean = false;
  public pselected: boolean = false;
  constructor(
    private location: Location,
    private clientService: ClientServiceService
  ) {
    this.url = this.location.path();
    // Écouter les changements d'URL
    this.location.onUrlChange((url) => {
      this.url = url;
      console.log(this.url);
    });
  }

  url: string = '';
  currentUser: any;
  public Folders: any = [];
  ngOnInit(): void {
    this.selected = true;
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

  goBack(): void {
    this.location.back();
  }

  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  dashboardSelected() {
    this.selected = true;
    this.cselected = false;
    this.dselected = false;
    this.pselected = false;
    this.isSidebarOpen = false;
  }

  creditSelected() {
    this.cselected = true;

    this.isSidebarOpen = false;
  }

  dossierSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = true;
    this.pselected = false;
    this.isSidebarOpen = false;
  }

  profileSelected() {
    this.selected = false;
    this.cselected = false;
    this.dselected = false;
    this.pselected = true;
    this.isSidebarOpen = false;
  }
}
