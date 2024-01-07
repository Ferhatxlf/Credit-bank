// information.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  @Input() clientName: string = 'moh';
  @Input() clientEmail!: string;

  folderValue: any;

  constructor(private sharedData: SharedDataService) {}

  ngOnInit() {
    this.folderValue = this.sharedData.getFolderData();
  }
}
