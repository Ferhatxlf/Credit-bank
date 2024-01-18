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
  folderList: string = '';
  foldersMine: string = '';
  isLoading: boolean = false;

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
    this.courtierService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
  url: string = '';

  ngOnInit() {
    const a = localStorage.getItem('currentUser');
    this.foldersMine = this.myFolders.length;
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    console.log(this.currentUser);
    this.courtierService.getAllDossier(this.currentUser.agence_id).subscribe(
      (rs) => {
        this.Folders = rs;
        console.log(this.Folders);
        this.folderList = this.Folders.length;
      },
      (err) => console.log(err)
    );
    this.F = this.Folders;

    this.courtierService.getAllMyFolders(this.currentUser.id).subscribe(
      (rs) => {
        this.myFolders = rs;
        this.myFolders = this.myFolders.filter(
          (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
        );
      },
      (err) => console.log(err)
    );
    this.courtierService.folderList$.subscribe((length) => {
      this.folderList = length;
      this.getAllMyFolders();
    });
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
  getAllMyFolders() {
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    this.courtierService.getAllMyFolders(this.currentUser.id).subscribe(
      (rs) => {
        this.myFolders = rs;
        this.myFolders = this.myFolders.filter(
          (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
        );
      },
      (err) => console.log(err)
    );
  }
}
