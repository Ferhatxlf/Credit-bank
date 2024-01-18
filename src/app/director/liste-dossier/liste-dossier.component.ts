import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { CourtierServiceService } from '../../service/courtier-service.service.js';
import { DirectorServiceService } from '../../service/director-service.service.js';
import { AuthServiceService } from '../../service/auth-service.service.js';
import { GlobalFunctionsService } from '../../service/global-functions.service.js';

@Component({
  selector: 'app-liste-dossier',
  templateUrl: './liste-dossier.component.html',
  styleUrl: './liste-dossier.component.css',
})
export class ListeDossierComponent implements OnInit {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders!: any;
  public F!: any;
  public searchActivate: boolean = false;
  currentUser: any;
  showModal: boolean = false;
  comment: any;
  selectedFolders: any[] = [];
  idDossier: any;
  folderList: any;
  constructor(
    private fb: FormBuilder,
    router: Router,
    private authService: AuthServiceService,
    private directeurService: DirectorServiceService,
    private globalFunctions: GlobalFunctionsService,
    private cdRef: ChangeDetectorRef
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      emprunteur: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('NON_TRAITEE'),
    });
    this.getAllFolders();
    this.directeurService.annoncerLoading(true);
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
          this.directeurService.annoncerLoading(false);
          this.Folders = rs;
          this.Folders = this.Folders.filter(
            (f) => f.status !== 'ACCEPTER' && f.status !== 'REFUSER'
          );
          this.F = this.Folders;
          console.log(this.Folders);
          this.updateFolderListToSideBar(this.Folders.length);
        },
        (err) => {
          console.log(err);
          this.directeurService.annoncerLoading(false);
        }
      );
  }
  updateFolderListToSideBar(length: string) {
    this.directeurService.updateFolderList(length);
  }
  updateFoldersList() {
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
          this.F = rs;
          this.cdRef.detectChanges(); // Force la détection des changements
          this.ngOnInit();
        },
        (err) => console.log(err)
      );
  }
  // poour la modale
  toggleShowModale(id) {
    this.showModal = !this.showModal;
    this.idDossier = id;
  }

  folderClicked(folder) {
    console.log(folder);
    this.router.navigate([`/director/detail-dossier`, folder.id]);
  }
  search() {
    if (this.searchActivate) {
      this.searchActivate = false;
      this.Folders = this.F;
    } else {
      this.searchActivate = true;
      const emprunteur = this.searchForm.value.emprunteur.toLowerCase();
      const nomProjet = this.searchForm.value.nom_projet.toLowerCase();
      const statut = this.searchForm.value.statut;

      //this.Folders = this.Folders.filter((f) => f.status === statut);
      this.Folders = this.Folders.filter(
        (dossier) =>
          dossier?.typeCredit?.nomCredit.toLowerCase().includes(nomProjet) &&
          (dossier?.client?.nom.toLowerCase().includes(emprunteur) ||
            dossier?.client?.prenom.toLowerCase().includes(emprunteur)) &&
          dossier.status === statut
      );
    }
  }
  /* updateSelectedFolders() {
    this.selectedFolders = this.Folders.filter(
      (folder) => folder.isSelected
    ).map((folder) => folder.id);
  } */
  updateSelectedFolders() {
    this.selectedFolders = this.Folders.filter((folder) => folder.isSelected);
  }

  async acceptFolder() {
    this.directeurService.annoncerLoading(true);
    try {
      const response = await this.directeurService.acceptFolder(
        this.selectedFolders
      );

      this.updateFoldersList();
      response.subscribe(
        (rs) => {
          this.directeurService.annoncerLoading(false);
          console.log(rs); // Log the success response
        },
        (err) => {
          this.directeurService.annoncerLoading(false);
          console.log(err); // Log any errors that occur
        }
      );
    } catch (error) {
      console.error(error); // Handle any errors that occur while obtaining the promise
    }
  }

  async rejectFolder() {
    this.directeurService.annoncerLoading(true);
    try {
      const response = await this.directeurService.rejectFolder(
        this.selectedFolders
      );

      this.updateFoldersList();
      console.log(response); // Log the success response if needed
      this.directeurService.annoncerLoading(false);
    } catch (error) {
      console.log(error); // Log any errors that occur
      this.directeurService.annoncerLoading(false);
    }
  }

  async renvoiFolder() {
    this.directeurService.annoncerLoading(true);
    try {
      const response = await this.directeurService.renvoiyeFolder(
        this.selectedFolders
      );

      this.updateFoldersList();
      console.log(response); // Log the success response if needed
      this.directeurService.annoncerLoading(false);
    } catch (error) {
      console.log(error); // Log any errors that occur
      this.directeurService.annoncerLoading(false);
    }
  }

  status(value) {
    return this.globalFunctions.status(value);
  }

  addComment() {
    this.directeurService
      .addComment(this.comment, this.idDossier)
      .subscribe((rs) => {
        console.log(rs);
        this.showModal = !this.showModal;
      });
  }
}
