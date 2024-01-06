import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface DirectionRegionale {
  id: number;
  nom: string;
  adresse: string;
  createdAt: Date;
}

@Component({
  selector: 'app-agence-regionnale',
  templateUrl: './agence-regionnale.component.html',
  styleUrls: ['./agence-regionnale.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class AgenceRegionnaleComponent implements OnInit {
  directionForm!: FormGroup;
  directionRegionales: DirectionRegionale[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.directionForm = this.formBuilder.group({
      nom: ['', Validators.required],
      // Add other form controls and validators if required
    });

    this.getAllDirectionRegionales();
  }

  addRegionalDirection() {
    if (this.directionForm.valid) {
      const directionData = {
        nom: this.directionForm.value.nom,
        // Add other properties if required
      };

      this.http.post('http://localhost:8000/directionregionales', directionData).subscribe(
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

  getAllDirectionRegionales() {
    this.http.get<DirectionRegionale[]>('http://localhost:8000/directionregionales').subscribe(
      (data: DirectionRegionale[]) => {
        this.directionRegionales = data;
        console.log('Retrieved direction regionales:', this.directionRegionales);
      },
      (error) => {
        console.error('Error fetching direction regionales:', error);
      }
    );
  }
}
