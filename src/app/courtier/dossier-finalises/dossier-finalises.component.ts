import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DirectorServiceService } from '../../service/director-service.service.js';
import { GlobalFunctionsService } from '../../service/global-functions.service.js';
import { CourtierServiceService } from '../../service/courtier-service.service.js';

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
    private globalFunctions: GlobalFunctionsService,
    private courtierService: CourtierServiceService
  ) {
    this.router = router;
  }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      emprunteur: this.fb.control(''),
      nom_projet: this.fb.control(''),
      statut: this.fb.control('ACCEPTER'),
    });

    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    this.courtierService.annoncerLoading(true);

    console.log(this.currentUser);
    this.directeurService
      .getAllDossierForDirector(this.currentUser.agence_id)
      .subscribe(
        (rs) => {
          this.Folders = rs;
          this.Folders = this.Folders.filter(
            (f) => f.status === 'ACCEPTER' || f.status === 'REFUSER'
          );
          this.F = this.Folders;
          console.log(this.Folders);
          setTimeout(() => {
            this.courtierService.annoncerLoading(false);
          }, 1000);
        },
        (err) => {
          console.log(err);
          setTimeout(() => {
            this.courtierService.annoncerLoading(false);
          }, 1000);
        }
      );
  }
  folderClicked(folder) {
    console.log(folder);
    this.router.navigate([`/courtier/detail-dossier`, folder.id]);
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

  status(value) {
    return this.globalFunctions.status(value);
  }
}
