import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
export interface Agence {
  id: number;
  nom: string;
  adresse: string;
  communes: any[]; // Update 'any[]' with the actual type of your communes
  directionRegionale: { nom: string }; // Assuming directionRegionale has a 'nom' property
  createdAt: Date;
  updatedAt: Date;
  // Add other properties as needed
}


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  agences: Agence[] = [];

 
  constructor(private router: Router,private http: HttpClient) {}

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


  onViewDetails(idAgence: number): void {
    this.router.navigate(['admin/agenceInfo', idAgence]);
  }
  
}
