import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css',
})
export class DetailClientComponent implements OnInit {
  folderValue: any;

  constructor(private sharedDataService: SharedDataService) {}
  ngOnInit() {
    this.folderValue = this.sharedDataService.getFolderData();
  }
}
