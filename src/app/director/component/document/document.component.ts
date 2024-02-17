import { Component, ElementRef, ViewChild } from '@angular/core';
import { SimulationServiceService } from '../../../service/simulation-service.service';
import { CourtierServiceService } from '../../../service/courtier-service.service';
import { ActivatedRoute } from '@angular/router';
import { ApiConfigService } from '../../../service/ApiConfig.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent {
  folderValue: any;
  id: any;
  private  apiUrl = this.apiConfigService.getApiUrl();
  constructor(
    private simulationService: SimulationServiceService,
    private courtierService: CourtierServiceService,
    private route: ActivatedRoute,
    private apiConfigService: ApiConfigService
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((parentParams) => {
      this.id = parentParams['id'];
    });

    this.simulationService.getDossier(this.id).subscribe(
      (res) => {
        this.folderValue = res;
      },
      (err) => console.log(err)
    );
  }

  extractFileNameFromPath(filePath: string): string {
    const pathParts: string[] = filePath.split('\\');
    return pathParts[pathParts.length - 1];
  }

  /*   testFileNameExtraction() {
    const filePath: string = 'C:\\data\\uploaded-files\\1\\beaaab1e-d315-4575-b1b2-2f6e92a032a9-New Text Document.txt';
    console.log('filePath:', filePath);
    const fileName: string = this.extractFileNameFromPath(filePath);
    console.log('Extracted filename:', fileName);
  } */
  openUrlInNewTab(url: string): void {
    window.open(url, '_blank');
  }
  downloadFile(d) {
    const name = this.extractFileNameFromPath(d.filePath);
    console.log(name);
    // Open a URL in a new tab

    // Example usage
    const targetUrl = `${this.apiUrl}/dossiers/downloadFile${name}`;
    //const targetUrl = `${this.apiUrl}/dossiers/downloadFile/${this.id}/${name}`;
    this.openUrlInNewTab(targetUrl);
  }
}
