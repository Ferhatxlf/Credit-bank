import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Compte {
  id: number;
  nin: string;
  role: string;
  agenceId: number;
  createdAt: string; // Update the type based on your data
  // Add other properties as needed
}
@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styleUrls: ['./courtier.component.css'],
})
export class CourtierComponent implements OnInit {


  comptes: Compte[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchComptes();
  }

  fetchComptes() {
    this.http.get<any[]>('http://localhost:8000/banque/comptes').subscribe(
      (data) => {
        this.comptes = data;
      },
      (error) => {
        console.error('Error fetching comptes:', error);
      }
    );
  }
}
