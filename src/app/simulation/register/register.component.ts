import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
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
        name: this.applyForm.value.name,
        firstName: this.applyForm.value.firstName,
        email: this.applyForm.value.email,
        callNumber: this.applyForm.value.callNumber
          ? this.applyForm.value.callNumber.replace(/\s+/g, '')
          : '',
        nin: this.applyForm.value.nin
          ? this.applyForm.value.nin.replace(/\s+/g, '')
          : '',
        postCode: this.applyForm.value.postCode
          ? this.applyForm.value.postCode.replace(/\s+/g, '')
          : '',
        address: this.applyForm.value.address,
        city: this.applyForm.value.city,
        nationality: this.applyForm.value.nationality,
        civility: this.applyForm.value.civility,
        maritalStatus: this.applyForm.value.maritalStatus,
      };
      console.log('revenue cumulé ');
      const formDataJson = JSON.stringify(formRegisterData);

      localStorage.setItem('formRegisterData', formDataJson);

      console.log(
        'Formulaire d inscription soumis avec les valeurs suivantes:',
        formRegisterData
      );
      this.router.navigate(['/simulation/confirmation']);
    } else {
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
