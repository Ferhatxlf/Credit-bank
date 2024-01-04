import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { SimulationServiceService } from '../../service/simulation-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, AfterViewInit {
  applyForm: FormGroup;
  defaultCivility = 'default';
  defaultMaritalStatus = 'default';
  submitted: boolean = false;
  nationnalitee: boolean = true;
  pays: boolean = true;
  toggleRegisterLogin: boolean = true;

  ngAfterViewInit() {
    // Mettez à jour defaultCivilite ici après la première vérification des changements
    this.defaultCivility = 'default';
    this.defaultMaritalStatus = 'default';
  }

  ngOnInit() {
    this.pays = true;
    this.nationnalitee = true;
    this.setNationnalite(true);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private simulationService: SimulationServiceService
  ) {
    this.applyForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      firstName: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      callNumber: ['', [Validators.required, Validators.minLength(10)]],
      nin: ['', [Validators.required, Validators.minLength(16)]],
      city: ['', [Validators.required, this.nameValidator]],
      postCode: ['', [Validators.required, Validators.minLength(5)]],
      nationality: ['', [Validators.required, this.nameValidator]],
      civility: ['', [Validators.required, this.civilityValidator]],
      maritalStatus: ['', [Validators.required, this.maritalStatusValidator]],
    });
  }
  setToggleRegisterLogin() {
    this.toggleRegisterLogin = !this.toggleRegisterLogin;
  }
  setNationnalite(value: boolean) {
    this.nationnalitee = value;
    if (value) {
      this.applyForm.get('nationality')?.reset();
      this.applyForm.get('nationality')?.disable();
    } else {
      this.applyForm.get('nationality')?.enable();
    }
  }
  setPays(value: boolean) {
    this.pays = value;
  }

  // Fonction de validation personnalisée pour nom et prenom
  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;

    if (typeof name !== 'string' || name.length < 3 || name.length > 25) {
      return { invalidName: true };
    }
    return null; // La validation a réussi
  }
  civilityValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const name = control.value;

    if (name == 'default') {
      return { invalidName: true };
    }
    return null; // La validation a réussi
  }
  maritalStatusValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const name = control.value;

    if (name == 'default') {
      return { invalidName: true };
    }
    return null; // La validation a réussi
  }

  submitForm() {
    if (this.applyForm.valid) {
      const formRegisterData = {
        nom: this.applyForm.value.name,
        prenom: this.applyForm.value.firstName,
        email: this.applyForm.value.email,
        telephone: this.applyForm.value.callNumber
          ? this.applyForm.value.callNumber.replace(/\s+/g, '')
          : '',
        nin: this.applyForm.value.nin
          ? this.applyForm.value.nin.replace(/\s+/g, '')
          : '',
        codePostal: this.applyForm.value.postCode
          ? this.applyForm.value.postCode.replace(/\s+/g, '')
          : '',
        adresse: this.applyForm.value.address,
        ville: this.applyForm.value.city,
        nationalite: this.applyForm.value.nationality
          ? this.applyForm.value.nationality
          : 'Algerienne',
        civilite: this.applyForm.value.civility,
        maritalStatus: this.applyForm.value.maritalStatus,
      };
      const formDataJson = JSON.stringify(formRegisterData);

      localStorage.setItem('formRegisterData', formDataJson);

      console.log(
        'Formulaire d inscription soumis avec les valeurs suivantes:',
        formRegisterData
      );

      this.authService.register(formDataJson).subscribe(
        (rs) => {
          const simulationData = localStorage.getItem('formImmobilierData');
          const dossier = {
            client_id: rs['id'],
            typeCredit: localStorage.getItem('creditType'),
            /*  typeFinancement: localStorage.getItem('financementType'),
            montantHabitation: simulationData
              ? simulationData['habitaion']
              : '',
            creditSouhaite: simulationData ? simulationData['credit'] : '',
            revenueEmprunteur: simulationData ? simulationData['revenue'] : '',
            revenueCoEmprunteur: simulationData
              ? simulationData['revenueCo']
              : '',
            montantAutreFinancementEnCours: simulationData
              ? simulationData['autherFinancing']
              : '',
            montantRevenueImmobilier: simulationData
              ? simulationData['revenuImobilier']
              : '',
            ageEmprunteur: simulationData ? simulationData['age'] : null,
            ageCoEmprunteur: simulationData ? simulationData['ageCo'] : null,
            dureeFinancement: simulationData ? simulationData['duree'] : '',
            montantAutreRevenue: 0, */
          };
          const d = JSON.stringify(dossier);
          console.log('-----------------d', d);
          this.simulationService.addDossier(d).subscribe(
            (rs) => {
              console.log('dossier cree');
            },
            (error) => {
              console.error('Erreur de connexion:', error);
            }
          );

          console.log(simulationData);
        },
        (error) => {
          console.error('Erreur de connexion:', error);
        }
      );
    } else {
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
