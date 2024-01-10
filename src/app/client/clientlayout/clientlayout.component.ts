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
  private listTitles!: any[];
  ROUTES: any = [
    {
      path: '/client/dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      class: '',
    },
    {
      path: '/client/profile',
      title: 'Mon Profile',
      icon: 'person',
      class: '',
    },
    {
      path: '/client/dossier',
      title: 'Mes dossiers',
      icon: 'person',
      class: '',
    },
    {
      path: '/client/detail-dossier',
      title: 'Detail',
      icon: 'person',
      class: '',
    },
    {
      path: '/client/nouveau-credit',
      title: 'Nouveau crédit',
      icon: 'person',
      class: '',
    },
    {
      path: '/admin/courtier',
      title: 'Gestion des courtiers',
      icon: 'person',
      class: '',
    },
    {
      path: '/admin/directeur',
      title: 'Gestion des directeurs',
      icon: 'person',
      class: '',
    },
    {
      path: '/courtier/dossier',
      title: 'Liste des dossiers',
      icon: 'person',
      class: '',
    },
    { path: '/admin/profile', title: 'Mon Profile', icon: 'person', class: '' },
  ];

  url: string = '';
  currentUser: any;
  public Folders: any = [];
  ngOnInit(): void {
    this.selected = true;
    this.isSidebarOpen = false;
    this.listTitles = this.ROUTES.filter((listTitle: any) => listTitle);
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
  // pour la navbar recuperation des titres ************
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
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
