import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agence-info',
  templateUrl: './agence-info.component.html',
  styleUrls: ['./agence-info.component.css']
})
export class AgenceInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Now, use the id as needed
      console.log('ID:', id); // Example: Log the id to the console
    });
  }
}
