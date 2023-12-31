import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-islamique-form',
  templateUrl: './islamique-form.component.html',
  styleUrl: './islamique-form.component.css',
})
export class IslamiqueFormComponent implements OnInit {
  patrimoine: boolean = false;
  coBorrower: boolean = false;
  otherFinancing: boolean = false;
  submitted: boolean = false;
  dureeMax1: number = 5;
  dureeMax2: number = 5;
  prixVehicule: number = 0;

  applyForm: FormGroup;

  ngOnInit(): void {
    this.setCoBorrower(false);
    this.applyForm.get('age')?.valueChanges.subscribe((age: number) => {
      if (isNaN(age) || age > 65) {
        this.dureeMax1 = 70 - Number(age);

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      } else if (isNaN(age) || age < 65) {
        this.dureeMax1 = 5;

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      }
    });
    this.applyForm.get('ageCo')?.valueChanges.subscribe((age: number) => {
      if (isNaN(age) || age > 65) {
        this.dureeMax2 = 70 - Number(age);

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      } else if (isNaN(age) || age < 65) {
        this.dureeMax2 = 5;

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      }
    });
    const prix = localStorage.getItem('prix');
    if (prix) {
      this.prixVehicule = parseFloat(prix);
    }
  }
  get dureeMax(): number {
    return Math.min(this.dureeMax1, this.dureeMax2);
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.applyForm = this.fb.group({
      revenue: ['', Validators.required],
      age: ['', [Validators.required, this.ageValidator]],
      credit: ['', [Validators.required, this.creditValidatorFactory()]],
      durer: ['', [Validators.required, this.durerValidatorFactory()]],
      revenueCo: ['', Validators.required],
      ageCo: ['', [Validators.required, this.ageValidator]],
    });
  }
  // Fonction de validation personnalisée pour l'âge
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const age = Number(control.value);

    if (isNaN(age) || age < 18 || age > 75) {
      return { invalidAge: true };
    }

    return null; // La validation a réussi
  }

  durerValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const durer = Number(control.value);
      const age = Number(this.applyForm?.get('age')?.value);
      const ageCo = Number(this.applyForm?.get('ageCo')?.value);

      if (isNaN(durer) || durer < 0 || durer > 5) {
        return { invalidDurer: true };
      }

      // Vérifier si l'âge et la durée dépassent 75 ans
      if (age + durer > 70 || ageCo + durer > 70) {
        return { ageDurerExceeds75: true };
      }

      return null; // La validation a réussi
    };
  }
  // validation pour credit 90%
  creditValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const credit = control.value.replace(/\s+/g, '');

      // Vérifier si le crédit dépasse 90% du montant de l'habitation
      if (credit > 0.8 * this.prixVehicule) {
        return { invalidCredit: true };
      }

      return null; // La validation a réussi
    };
  }

  setCoBorrower(value: boolean) {
    this.coBorrower = value;
    if (!value) {
      this.applyForm.get('revenueCo')?.reset();
      this.applyForm.get('ageCo')?.reset();
      this.applyForm.get('revenueCo')?.disable();
      this.applyForm.get('ageCo')?.disable();
    } else {
      this.applyForm.get('revenueCo')?.enable();
      this.applyForm.get('ageCo')?.enable();
    }
  }

  submitForm() {
    if (this.applyForm.valid) {
      let revenue = this.applyForm.value.revenue
        ? this.applyForm.value.revenue.replace(/\s+/g, '')
        : '';
      let revenueCo = this.applyForm.value.revenueCo
        ? this.applyForm.value.revenueCo.replace(/\s+/g, '')
        : '';
      let revenueCumule = revenueCo
        ? Number(revenue) + Number(revenueCo)
        : Number(revenue);
      const formislamiqueData = {
        credit: this.applyForm.value.credit
          ? this.applyForm.value.credit.replace(/\s+/g, '')
          : '',
        revenue: this.applyForm.value.revenue
          ? this.applyForm.value.revenue.replace(/\s+/g, '')
          : '',
        revenueCo: this.applyForm.value.revenueCo
          ? this.applyForm.value.revenueCo.replace(/\s+/g, '')
          : '',
        age: this.applyForm.value.age,
        ageCo: this.applyForm.value.ageCo,
        durer: this.applyForm.value.durer,
        revenueCumule: revenueCumule,
        prixVehicule: this.prixVehicule,
      };

      const formDataJson = JSON.stringify(formislamiqueData);

      localStorage.setItem('formislamiqueData', formDataJson);

      console.log(
        'Formulaire soumis avec les valeurs suivantes:',
        formislamiqueData
      );
      this.router.navigate(['/simulation/result']);
    } else {
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
