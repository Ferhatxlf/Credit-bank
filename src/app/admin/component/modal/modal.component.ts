// modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FormData {
  nin: string;
  password: string;
  role: string;
  agenceId: string;
}

interface Agence {
  id: number;
  nom: string;
  // Other properties as needed
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<FormData>();

  formData: FormData = {
    nin: '',
    password: '',
    role: '',
    agenceId: ''
  };
  agences: Agence[] = [];
  roleOptions: string[] = ['directeur', 'courtier', 'admin', 'banquierregionale'];

  constructor(private http: HttpClient) {
    this.fetchAgences();
  }

  fetchAgences(): void {
    this.http.get<Agence[]>('http://localhost:8000/agence-commune/getallagences').subscribe(
      (data: Agence[]) => {
        this.agences = data;
      },
      (error) => {
        console.error('Error fetching agences:', error);
      }
    );
  }

  onSubmit(): void {
    // Transform the selected role to the corresponding number
    const roleMappings: { [key: string]: string } = {
      'directeur': '0',
      'courtier': '1',
      'admin': '2',
      'banquierregionale': '3'
    };

    this.formData.role = roleMappings[this.formData.role] || '';

    // Extract the id of the selected agence
    const selectedAgence = this.agences.find(agence => agence.id === +this.formData.agenceId);

    // Check if a valid agence is selected
    if (selectedAgence) {
      // Use the id of the selected agence in the form data
      this.formData.agenceId = selectedAgence.id.toString();

      // Validate the form data
      if (this.validateForm()) {
        // Perform the POST request
        this.http.post('http://localhost:8000/banque/comptes/create', this.formData).subscribe(
          (response) => {
            console.log('POST request successful:', response);
            // Optionally, emit an event to inform the parent component or perform other actions
            this.submitForm.emit(this.formData);
          },
          (error) => {
            console.error('Error in POST request:', error);
            // Handle errors as needed
          }
        );
      }
    }
  }

  private validateForm(): boolean {
    // Basic validation example (you can customize this based on your requirements)
    if (!this.formData.nin || !this.formData.password || !this.formData.role || !this.formData.agenceId) {
      // If any required field is empty, consider the form as invalid
      console.error('Form validation failed: Required fields are missing.');
      return false;
    }

    // Additional validation logic can be added here

    // If all validation checks pass, return true
    return true;
  }
}
