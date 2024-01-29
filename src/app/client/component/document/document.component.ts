import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';
import { ClientServiceService } from '../../../service/client-service.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent implements OnInit {
  folderValue: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput3') fileInput3!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput4') fileInput4!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput5') fileInput5!: ElementRef<HTMLInputElement>;
  files: (File | null)[] = [];
  id: any;
  pieceIdentite: boolean = false;
  residence: boolean = false;
  paie: boolean = false;
  autre: boolean = false;
  permis: boolean = false;
  attestation: boolean = false;

  hasIdentite: boolean = false;
  hasResidence: boolean = false;
  hasPaie: boolean = false;
  hasAutre: boolean = false;
  hasPermis: boolean = false;
  hasAttestation: boolean = false;

  openIdentite: boolean = false;
  openResidance: boolean = false;
  openFicheDePaieOne: boolean = false;
  openFicheDePaieTwo: boolean = false;
  openFicheDePaieThree: boolean = false;
  openAutre: boolean = false;
  openPermis: boolean = false;
  openAttestation: boolean = false;

  isLoading: boolean = false;
  isLoadingDeleteIdentite: boolean = false;
  isLoadingDeleteResidence: boolean = false;
  isLoadingDeletePaie: boolean = false;
  isLoadingDeleteAutre: boolean = false;
  isLoadingDeletePermis: boolean = false;
  isLoadingDeleteAttestation: boolean = false;

  constructor(
    private simulationService: SimulationServiceService,
    private clientService: ClientServiceService
  ) {}

  ngOnInit() {
    const a = localStorage.getItem('idDossier');
    if (a) {
      this.id = JSON.parse(a);
    }
    this.simulationService.getDossier(this.id).subscribe(
      (res) => {
        this.folderValue = res;

        console.log(res);
        this.hasIdentite = this.folderValue.attachedFiles.some(
          (f) => f.fileName === 'Piece identite.pdf'
        );
        this.hasResidence = this.folderValue.attachedFiles.some(
          (f) => f.fileName === 'Fichier de residence.pdf'
        );
        console.log(this.hasResidence);
        this.hasPaie = this.folderValue.attachedFiles.some(
          (f) => f.fileName === 'Fiche de paie.pdf'
        );
        this.hasAutre = this.folderValue.attachedFiles.some(
          (f) => f.fileName === 'Autre justificatif de revenu.pdf'
        );
        this.hasPermis = this.folderValue.attachedFiles.some(
          (f) => f.fileName === 'Permis de construction.pdf'
        );
        this.hasAttestation = this.folderValue.attachedFiles.some(
          (f) => f.fileName === 'Attestation de reservation.pdf'
        );
        console.log(this.hasAutre);
      },
      (err) => console.log(err)
    );
  }
  toggleOpen(variable: string) {
    switch (variable) {
      case 'openIdentité':
        this.openIdentite = !this.openIdentite;
        break;
      case 'openResidance':
        this.openResidance = !this.openResidance;
        break;
      case 'openFicheDePaieOne':
        this.openFicheDePaieOne = !this.openFicheDePaieOne;
        break;
      case 'openFicheDePaieTwo':
        this.openFicheDePaieTwo = !this.openFicheDePaieTwo;
        break;
      case 'openFicheDePaieThree':
        this.openFicheDePaieThree = !this.openFicheDePaieThree;
        break;
      case 'openAutre':
        this.openAutre = !this.openAutre;
        break;
      case 'openPermis':
        this.openPermis = !this.openPermis;
        break;
      case 'openAttestation':
        this.openAttestation = !this.openAttestation;
        break;
      default:
        console.log('Variable non reconnue');
    }
  }

  // openFileInput(i) {
  //   const event = new MouseEvent('click');
  //   if (i === 0) this.fileInput.nativeElement.dispatchEvent(event);
  //   if (i === 1) this.fileInput1.nativeElement.dispatchEvent(event);
  //   if (i === 2) this.fileInput2.nativeElement.dispatchEvent(event);
  //   if (i === 3) this.fileInput3.nativeElement.dispatchEvent(event);
  // }
  openFileInput(i) {
    const event = new MouseEvent('click');
    let fileInput: ElementRef<HTMLInputElement> | undefined;

    if (i === 0) fileInput = this.fileInput;
    if (i === 1) fileInput = this.fileInput1;
    if (i === 2) fileInput = this.fileInput2;
    if (i === 3) fileInput = this.fileInput3;
    if (i === 4) fileInput = this.fileInput4;
    if (i === 5) fileInput = this.fileInput5;

    if (fileInput) {
      fileInput.nativeElement.onchange = () => {
        if (
          fileInput?.nativeElement.files &&
          fileInput.nativeElement.files[0].type !== 'application/pdf'
        ) {
          alert('Veuillez télécharger uniquement des fichiers PDF.');
          fileInput.nativeElement.value = '';
          this.pieceIdentite = false;
          this.residence = false;
          this.paie = false;
          this.autre = false;
          this.permis = false;
          this.attestation = false;
        }
      };

      fileInput.nativeElement.dispatchEvent(event);
    } else {
      console.log('fileInput is undefined');
    }
  }
  onFileSelected(event: any, customFileName: string) {
    console.log(customFileName);
    console.log(event.target);

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const modifiedFile = new File([selectedFile], customFileName, {
        type: selectedFile.type,
      });

      this.files.push(modifiedFile);

      if (customFileName === 'Piece identite') {
        this.pieceIdentite = true;
      }
      if (customFileName === 'Fichier de residence') {
        this.residence = true;
      }
      if (customFileName === 'Fiche de paie') {
        this.paie = true;
      }
      if (customFileName === 'Autre justificatif de revenu') {
        this.autre = true;
      }
      if (customFileName === 'Permis de construction') {
        this.permis = true;
      }
      if (customFileName === 'Attestation de reservation') {
        this.attestation = true;
      }

      console.log(this.files);
    }
  }

  sendFile(name) {
    // Filtrer les fichiers correspondant au nom fourni
    this.isLoading = true;
    const filesToUpload = this.files.filter((f) => name === f?.name);

    if (filesToUpload.length === 0) {
      console.error('Aucun fichier trouvé avec le nom fourni:', name);
      return;
    }

    // Supprimer tous les fichiers correspondant au nom du tableau principal
    this.files = this.files.filter((f) => name !== f?.name);

    // Utiliser le premier fichier trouvé (vous pouvez ajuster selon vos besoins)
    const file = filesToUpload[0];
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      // Récupérer l'ID du dossier
      this.id = this.folderValue.id;

      // Appeler le service pour ajouter le document
      this.simulationService.addDocument(this.id, formData).subscribe(
        (rs) => {
          this.simulationService.getDossier(this.id).subscribe(
            (res) => {
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
              this.folderValue = res;

              console.log(res);
              this.hasIdentite = this.folderValue.attachedFiles.some(
                (f) => f.fileName === 'Piece identite.pdf'
              );
              this.hasResidence = this.folderValue.attachedFiles.some(
                (f) => f.fileName === 'Fichier de residence.pdf'
              );
              console.log(this.hasResidence);
              this.hasPaie = this.folderValue.attachedFiles.some(
                (f) => f.fileName === 'Fiche de paie.pdf'
              );
              this.hasAutre = this.folderValue.attachedFiles.some(
                (f) => f.fileName === 'Autre justificatif de revenu.pdf'
              );
              this.hasPermis = this.folderValue.attachedFiles.some(
                (f) => f.fileName === 'Permis de construction.pdf'
              );
              this.hasAttestation = this.folderValue.attachedFiles.some(
                (f) => f.fileName === 'Attestation de reservation.pdf'
              );
              console.log(this.hasAttestation);
            },
            (err) => {
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
              console.log(err);
            }
          );
          console.log('Fichiers téléchargés avec succès');
        },
        (error) => {
          // Gérer les erreurs d'upload
          console.error('Erreur lors du téléchargement des fichiers', error);
        }
      );
    }
  }

  deleteFile(name) {
    this.openAutre = false;
    this.openFicheDePaieOne = false;
    this.openIdentite = false;
    this.openResidance = false;
    this.pieceIdentite = false;
    this.residence = false;
    this.autre = false;
    this.paie = false;
    this.permis = false;
    this.attestation = false;
    this.openPermis = false;
    this.openAttestation = false;

    // Set the appropriate isLoadingDeleteType based on the file being deleted
    if (name === 'Piece identite.pdf') {
      this.isLoadingDeleteIdentite = true;
    } else if (name === 'Fichier de residence.pdf') {
      this.isLoadingDeleteResidence = true;
    } else if (name === 'Fiche de paie.pdf') {
      this.isLoadingDeletePaie = true;
    } else if (name === 'Autre justificatif de revenu.pdf') {
      this.isLoadingDeleteAutre = true;
    } else if (name === 'Permis de construction.pdf') {
      this.isLoadingDeletePermis = true;
    } else if (name === 'Attestation de reservation.pdf') {
      this.isLoadingDeleteAttestation = true;
    }

    this.clientService.deleteFile(name, this.id).subscribe(
      (rs) => {
        this.simulationService.getDossier(this.id).subscribe(
          (res) => {
            setTimeout(() => {
              this.isLoadingDeleteIdentite = false;
              this.isLoadingDeleteResidence = false;
              this.isLoadingDeletePaie = false;
              this.isLoadingDeleteAutre = false;
              this.isLoadingDeletePermis = false;
              this.isLoadingDeleteAttestation = false;
            }, 1000);
            this.folderValue = res;

            console.log(res);
            this.hasIdentite = this.folderValue.attachedFiles.some(
              (f) => f.fileName === 'Piece identite.pdf'
            );
            this.hasResidence = this.folderValue.attachedFiles.some(
              (f) => f.fileName === 'Fichier de residence.pdf'
            );
            console.log(this.hasResidence);
            this.hasPaie = this.folderValue.attachedFiles.some(
              (f) => f.fileName === 'Fiche de paie.pdf'
            );
            this.hasAutre = this.folderValue.attachedFiles.some(
              (f) => f.fileName === 'Autre justificatif de revenu.pdf'
            );
            this.hasPermis = this.folderValue.attachedFiles.some(
              (f) => f.fileName === 'Permis de construction.pdf'
            );
            this.hasAttestation = this.folderValue.attachedFiles.some(
              (f) => f.fileName === 'Attestaion de reservation.pdf'
            );
            console.log(this.hasAutre);
          },
          (err) => {
            setTimeout(() => {
              this.isLoadingDeleteIdentite = false;
              this.isLoadingDeleteResidence = false;
              this.isLoadingDeletePaie = false;
              this.isLoadingDeleteAutre = false;
              this.isLoadingDeleteAttestation = false;
              this.isLoadingDeletePermis = false;
            }, 1000);
            console.log(err);
          }
        );
        console.log('Fichiers téléchargés avec succès');
      },
      (err) => {
        console.log('erreur lors de la supression', err);
        setTimeout(() => {
          this.isLoadingDeleteIdentite = false;
          this.isLoadingDeleteResidence = false;
          this.isLoadingDeletePaie = false;
          this.isLoadingDeleteAutre = false;
          this.isLoadingDeleteAttestation = false;
          this.isLoadingDeletePermis = false;
        }, 1000);
      }
    );
  }
}
