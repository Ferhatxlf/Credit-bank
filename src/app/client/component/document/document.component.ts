import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { SimulationServiceService } from '../../../service/simulation-service.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent implements OnInit {
  folderValue: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  files: (File | null)[] = [];
  id: any;

  constructor(
    private sharedData: SharedDataService,
    private simulationService: SimulationServiceService
  ) {}

  ngOnInit() {
    const a = localStorage.getItem('idDossier');
    if (a) {
      this.id = JSON.parse(a);
    }
    this.simulationService.getDossier(this.id).subscribe(
      (res) => {
        this.folderValue = res;
      },
      (err) => console.log(err)
    );
  }

  openFileInput() {
    const event = new MouseEvent('click');
    this.fileInput.nativeElement.dispatchEvent(event);
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.files.push(selectedFile);
      // this.uploadNextFile();
    }
    console.log(this.files);
  }

  /*   uploadNextFile() {
    // Envoyer le fichier actuel au backend ici
    // Réinitialiser la sélection du fichier pour la prochaine fois
    this.fileInput.nativeElement.value = '';

    // Passer au fichier suivant dans la liste
    if (this.currentFileIndex < this.fileTypes.length - 1) {
      this.currentFileIndex++;
    }
  } */

  removeFile(file) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
      console.log('Fichier supprimé avec succès.');
    } else {
      console.error("Le fichier n'a pas été trouvé dans la liste.");
    }
  }
  sendFile(file) {
    const formData = new FormData();
    formData.append('files', file);

    this.id = this.folderValue.id;

    this.simulationService.addDocument(this.id, formData).subscribe(
      (rs) => {
        this.folderValue.attachedFiles.push(file);
        this.removeFile(file);
        console.log('files uploads succesfuly');
      },
      (error) => {
        console.error('error uploding files', error);
      }
    );
  }
}
