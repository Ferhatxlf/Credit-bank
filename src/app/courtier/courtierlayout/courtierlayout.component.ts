import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CourtierServiceService } from '../../service/courtier-service.service';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-courtierlayout',
  templateUrl: './courtierlayout.component.html',
  styleUrl: './courtierlayout.component.css',
})
export class CourtierlayoutComponent {
  currentUser: any;
  public Folders: any = [];
  public myFolders: any = [];
  public F: any = [];

  constructor(
    private location: Location,
    private courtierService: CourtierServiceService,
    private authService: AuthServiceService
  ) {
    this.url = this.location.path();
    // Écouter les changements d'URL
    this.location.onUrlChange((url) => {
      this.url = url;
      console.log(this.url);
    });
  }
  url: string = '';

  ngOnInit() {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
      (rs) => {
        this.Folders = rs;
        console.log(this.Folders);
      },
      (err) => console.log(err)
    );
    this.F = this.Folders;

    this.courtierService.getDossierEncours(this.currentUser.id).subscribe(
      (rs) => {
        this.myFolders = rs;
        console.log(this.Folders);
      },
      (err) => console.log(err)
    );
  }

  goBack(): void {
    this.location.back();
  }

  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
