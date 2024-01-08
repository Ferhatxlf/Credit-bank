import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent implements OnInit {
  folderValue: any;

  constructor(private sharedData: SharedDataService) {}

  ngOnInit() {
    this.folderValue = this.sharedData.getFolderData();
  }
}
