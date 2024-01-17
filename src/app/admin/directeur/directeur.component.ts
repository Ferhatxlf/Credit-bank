import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Commune {
  id: number;
  nom: string; 
  codePostal: string;
  // Add other properties as needed
}
interface DirectionRegionale {
  id: number;
  nom: string; 
adresse :string; 
createdAt:Date;


}
@Component({
  selector: 'app-directeur',
  templateUrl: './directeur.component.html',
  styleUrls: ['./directeur.component.css'],
})
export class DirecteurComponent implements OnInit {
  communeForm!: FormGroup;
  communes: Commune[] = [];
 // showForm: boolean = true;
  directionForm!: FormGroup;
  directionRegionales: DirectionRegionale[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}





  showCommuneModal = false;
  showForm = true; // You can manage the toggle between forms using this property

  showCommuneForm() {
    this.showCommuneModal = true;
  }

  showDirectionForm() {
    // Implement logic to show Agence Régionale form
  }
  ngOnInit() {
    this.communeForm = this.formBuilder.group({
      communeName: ['', Validators.required],
      codePostal: ['', Validators.required],
    });
    this.getAllCommunes();
    this.directionForm = this.formBuilder.group({
      nom: ['', Validators.required],
      // Add more fields if necessary for the regional direction form
    });
    this.getAllDirectionRegionales(); 
  }

  addCommune() {
    if (this.communeForm.valid) {
      const communeData = {
        name: this.communeForm.value.communeName,
        codePostal: this.communeForm.value.codePostal,
      };
  
      this.http.post('https://thin-laugh-production.up.railway.app/agence-commune/addcommune', communeData)
        .subscribe(
          (response) => {
            console.log('Commune added:', response);
            this.getAllCommunes(); // Refresh commune list after addition
          },
          (error) => {
            console.error('Error adding commune:', error);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
  

  getAllCommunes() {
    this.http.get<Commune[]>('https://thin-laugh-production.up.railway.app/agence-commune').subscribe(
      (data: Commune[]) => {
        this.communes = data;
        console.log('Retrieved communes:', this.communes);
      },
      (error) => {
        console.error('Error fetching communes:', error);
      }
    );
  }

  toggleView() {
    this.showForm = !this.showForm;
  }


  addRegionalDirection() {
    if (this.directionForm.valid) {
      const directionData = {
        nom: this.directionForm.value.nom,
        // Add other properties if required
      };

      this.http.post('https://thin-laugh-production.up.railway.app/directionregionales', directionData).subscribe(
        (response) => {
          console.log('Regional direction added:', response);
          // Handle success - maybe refresh the direction list or show a success message
        },
        (error) => {
          console.error('Error adding regional direction:', error);
          // Handle error - display an error message or take appropriate action
        }
      );
    } else {
      console.log('Form is invalid');
      // Handle invalid form submission
    }
  }




  // ... existing code

  getAllDirectionRegionales() {
    this.http.get<DirectionRegionale[]>('https://thin-laugh-production.up.railway.app/directionregionales').subscribe(
      (data: DirectionRegionale[]) => {
        this.directionRegionales = data;
        console.log('Retrieved direction regionales:', this.directionRegionales);
      },
      (error) => {
        console.error('Error fetching direction regionales:', error);
      }
    );
  }







  

///////////
itemsPerPage = 10; // Number of items per page
currentPage = 1; // Current page number

get startIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage;
}

get endIndex(): number {
  return Math.min(this.currentPage * this.itemsPerPage - 1, this.communes.length - 1);
}

changePage(pageNumber: number): void {
  this.currentPage = pageNumber;
}

}
