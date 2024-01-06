// upload.component.ts

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SimulationServiceService } from '../../../service/simulation-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  files: (File | null)[] = [];
  currentFileIndex: number = 0;
  toggleNoticeUploader: boolean = false;
  fileTypes: string[] = [
    "Pièce d'identité",
    'Première fiche de paie',
    'Deuxième  fiche de paie',
    'Troisième  fiche de paie',
    'Fichier de résidence',
  ];
  constructor(private simulationService: SimulationServiceService) {}
  ngAfterViewInit() {
    console.log(this.fileInput); // Doit afficher l'élément d'entrée de fichier dans la console
  }
  get currentFileType(): string {
    return this.fileTypes[this.currentFileIndex];
  }

  setToggleNoticeUploader() {
    this.toggleNoticeUploader = !this.toggleNoticeUploader;
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.files.push(selectedFile);
      this.uploadNextFile();
    }
  }
  deselectFile(file: File | null) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
      this.fileInput.nativeElement.value = '';
    }
  }
  openFileInput() {
    const event = new MouseEvent('click');
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  uploadNextFile() {
    // Envoyer le fichier actuel au backend ici
    // Réinitialiser la sélection du fichier pour la prochaine fois
    this.fileInput.nativeElement.value = '';

    // Passer au fichier suivant dans la liste
    if (this.currentFileIndex < this.fileTypes.length - 1) {
      this.currentFileIndex++;
    }
  }

  isButtonDisabled(): boolean {
    // Vérifier si tous les fichiers nécessaires ont été sélectionnés
    return this.files.length !== this.fileTypes.length;
  }
  sendAllFiles() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (file) {
        formData.append('files', file);
      }
    }

    this.simulationService.addDocument(1, formData).subscribe(
      (rs) => {
        console.log('files uploads succesfuly');
      },
      (error) => {
        console.error('error uploding files', error);
      }
    );

    // Envoyer formData au backend ici
  }
}
