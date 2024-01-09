import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agence {
  id: number;
  nom: string;
  adresse: string;
  communes: any[]; // Update 'any[]' with the actual type of your communes
  directionRegionale: { nom: string }; // Assuming directionRegionale has a 'nom' property
  createdAt: string; // Update with the actual type of createdAt
  updatedAt: string; // Update with the actual type of updatedAt
  // Add other properties as needed
}


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  agences: Agence[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAgences();
  }

  fetchAgences(): void {
    // Assuming you fetch Agence data via HTTP request
    this.http.get<Agence[]>('http://localhost:8000/agence-commune/getallagences').subscribe(
      (data: Agence[]) => {
        this.agences = data;
      },
      (error) => {
        console.error('Error fetching agences:', error);
      }
    );
  }
}
