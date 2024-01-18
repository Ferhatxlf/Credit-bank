import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DirectorServiceService } from '../../service/director-service.service.js';
import { GlobalFunctionsService } from '../../service/global-functions.service.js';

@Component({
  selector: 'app-dossier-finalises',
  templateUrl: './dossier-finalises.component.html',
  styleUrl: './dossier-finalises.component.css',
})
export class DossierFinalisesComponent {
  public router!: Router;
  public searchForm!: FormGroup;
  public Folders!: any;
  public F!: any;
  public searchActivate: boolean = false;
  currentUser: any;
  constructor(
    private fb: FormBuilder,
    router: Router,
    private directeurService: DirectorServiceService,
    private globalFunctions: GlobalFunctionsService
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    this.directeurService.annoncerLoading(true);
    this.searchForm = this.fb.group({
      numero_dossier: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('ACCEPTER'),
    });

    this.getAllFolders();
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
            (f) => f.status === 'ACCEPTER' || f.status === 'REFUSER'
          );
          this.F = this.Folders;
          console.log(this.Folders);
        },
        (err) => {
          console.log(err);
          this.directeurService.annoncerLoading(false);
        }
      );
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
      const statut = this.searchForm.value.statut;
      console.log(statut);
      console.log(this.Folders);
      console.log(this.F);
      this.Folders = this.Folders.filter((f) => f.status === statut);
    }
  }

  status(value) {
    return this.globalFunctions.status(value);
  }
}
