import { Component, ElementRef, ViewChild } from '@angular/core';
import { SimulationServiceService } from '../../../service/simulation-service.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent {
  folderValue: any;
  id: any;

  constructor(private simulationService: SimulationServiceService) {}

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
}
