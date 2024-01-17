import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Dossier {
  id: number;
  nomDossier: string;
  client: any; // Adjust the type based on your Client interface or model
  typeCredit: any; // Adjust the type based on your TypeCredit interface or model
  directeurAgence: any; // Adjust the type based on your Compte interface or model
  attachedFiles: any[]; // Adjust the type based on your AttachedFile interface or model
  assignedCourtier: any; // Adjust the type based on your Compte interface or model
  status: string; // Adjust the type based on your DossierStatus enum or model
  assignedagence: any; // Adjust the type based on your Agence interface or model
  assigneddirectionregionnale: any; // Adjust the type based on your DirectionRegionale interface or model
  montantHabitation: number;
  revenueEmprunteur: number;
  ageEmprunteur: number;
  creditSouhaite: number;
  dureeFinancement: number;
  revenueCoEmprunteur: number;
  ageCoEmprunteur: number;
  montantRevenueImmobilier: number;
  montantAutreRevenue: number;
  montantAutreFinancementEnCours: number;
  createdAt: string; // Adjust the type based on your date format
  updatedAt: string; // Adjust the type based on your date format
  commentaires: any[]; // Adjust the type based on your Commentaire interface or model
  actions: any[]; // Adjust the type based on your DossierAction interface or model
}

@Component({
  selector: 'app-agence-info',
  templateUrl: './agence-info.component.html',
  styleUrls: ['./agence-info.component.css']
})
export class AgenceInfoComponent implements OnInit {

  idAgence: number = 0;
  dossiers: Dossier[] = [];




  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAgence = +params['id'];

      // Fetch dossiers for the agence
      this.fetchDossiers();
    });
  }

  fetchDossiers(): void {
    const apiUrl = `https://thin-laugh-production.up.railway.app/dossiers/agence/${this.idAgence}`;

    this.http.get<Dossier[]>(apiUrl).subscribe(
      (data: Dossier[]) => {
        this.dossiers = data;
      },
      (error) => {
        console.error('Error fetching dossiers:', error);
      }
    );
  }

  selectedDossier: Dossier | null = null;

  // ... (existing code)

  openModal(dossier: Dossier): void {
    console.log("opening modal")
      this.selectedDossier = dossier;
  }

  closeModal(): void {
    this.selectedDossier = null;
  }  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
