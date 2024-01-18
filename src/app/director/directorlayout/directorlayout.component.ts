import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { DirectorServiceService } from '../../service/director-service.service';

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
  userNin: string | null = null;
  userRole: string | null = null;
  client: any;
  F: any;
  isLoading: boolean = false;
  folderList: any;
  constructor(
    private location: Location,
    private authService: AuthServiceService,
    private directeurService: DirectorServiceService
  ) {
    this.url = this.location.path();
    // Écouter les changements d'URL
    this.location.onUrlChange((url) => {
      this.url = url;
      console.log(this.url);
    });
    this.directeurService.loading$.subscribe((loading) => {
      this.isLoading = loading;
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
    {
      path: '/courtier/mes-dossier',
      title: 'Mes dossiers',
      icon: 'person',
      class: '',
    },
    {
      path: '/director/dossier',
      title: 'Liste des dossiers',
      icon: 'person',
      class: '',
    },
    {
      path: '/director/dashboard',
      title: 'Dashboard',
      icon: 'person',
      class: '',
    },
    {
      path: '/director/dossier-finalise',
      title: 'Dossiers finalisés',
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
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
      this.userNin = this.currentUser.nin;
      this.userRole = this.currentUser.role;
    }

    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.directeurService
      .getAllDossierForDirector(this.currentUser.agence_id)
      .subscribe(
        (rs) => {
          this.Folders = rs;
          this.Folders = this.Folders.filter(
            (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
          );
          this.F = this.Folders;
          console.log(this.Folders);
        },
        (err) => console.log(err)
      );
    this.directeurService.folderList$.subscribe((length) => {
      this.folderList = length;
      this.getAllFolders();
    });
  }
  getAllFolders() {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.directeurService
      .getAllDossierForDirector(this.currentUser.agence_id)
      .subscribe(
        (rs) => {
          this.Folders = rs;
          this.Folders = this.Folders.filter(
            (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
          );
          this.F = this.Folders;
          console.log(this.Folders);
        },
        (err) => console.log(err)
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

  logout() {
    this.authService.logout();
  }
}
