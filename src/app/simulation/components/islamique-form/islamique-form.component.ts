import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  otherCarAndMoto: boolean = false;
  submitted: boolean = false;

  dureeMax1: number = 5;
  dureeMax2: number = 5;
  dureeImmobilierMax1: number = 35;
  dureeImmobilierMax2: number = 35;
  prixVehicule: number = 0;
  bien: string = '';

  applyForm: FormGroup;

  ngOnInit(): void {
    const prix = localStorage.getItem('prix');
    const otherCarAndMoto = localStorage.getItem('islamiqueType');
    const islamiqueForm = sessionStorage.getItem('formislamiqueData');
    if (islamiqueForm) {
      const islamiqueFormJson = JSON.parse(islamiqueForm);
      this.applyForm.patchValue(islamiqueFormJson);
    }
    this.setCoBorrower(false);
    this.applyForm.get('age')?.valueChanges.subscribe((age: number) => {
      if (this.otherCarAndMoto) {
        if (isNaN(age) || age > 40) {
          this.dureeImmobilierMax1 = 75 - Number(age);
        } else {
          if (isNaN(age) || age < 40) {
            this.dureeImmobilierMax1 = 35;
          }
        }
        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      } else {
        if (isNaN(age) || age > 65) {
          this.dureeMax1 = 70 - Number(age);
        } else {
          if (isNaN(age) || age < 65) {
            this.dureeMax1 = 5;
          }
        }
        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      }
    });
    this.applyForm.get('ageCo')?.valueChanges.subscribe((age: number) => {
      if (this.otherCarAndMoto) {
        if (isNaN(age) || age > 40) {
          this.dureeImmobilierMax1 = 75 - Number(age);
        } else {
          if (isNaN(age) || age < 40) {
            this.dureeImmobilierMax1 = 35;
          }
        }
        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      } else {
        if (isNaN(age) || age > 65) {
          this.dureeMax2 = 70 - Number(age);
        } else {
          if (isNaN(age) || age < 65) {
            this.dureeMax2 = 5;
          }
        }
        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      }
    });
    if (prix) {
      this.prixVehicule = parseFloat(prix);
    }
    if (otherCarAndMoto === 'ijaraTamilikiya') {
      this.otherCarAndMoto = true;
    }
  }
  get dureeMax(): number {
    if (this.otherCarAndMoto) {
      return Math.min(this.dureeImmobilierMax1, this.dureeImmobilierMax2);
    } else {
      return Math.min(this.dureeMax1, this.dureeMax2);
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.applyForm = this.fb.group({
      bien: [''],
      revenue: ['', Validators.required],
      age: ['', [Validators.required, this.ageValidator]],
      credit: ['', [Validators.required, this.creditValidatorFactory()]],
      durer: ['', [Validators.required, this.durerValidatorFactory()]],
      revenueCo: ['', Validators.required],
      ageCo: ['', [Validators.required, this.ageValidator]],
    });
  }
  // Fonction de validation personnalisée pour l'âge
  ageValidator = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const age = Number(control.value);

    if (
      this.otherCarAndMoto
        ? isNaN(age) || age < 18 || age > 75
        : isNaN(age) || age < 18 || age > 70
    ) {
      return { invalidAge: true };
    }

    return null; // La validation a réussi
  };

  durerValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const durer = Number(control.value);
      const age = Number(this.applyForm?.get('age')?.value);
      const ageCo = Number(this.applyForm?.get('ageCo')?.value);

      if (this.otherCarAndMoto) {
        if (
          isNaN(durer) ||
          durer < 0 ||
          durer > 35 ||
          age + durer > 75 ||
          ageCo + durer > 75
        ) {
          return { invalidDurer: true };
        }
      } else {
        if (
          isNaN(durer) ||
          durer < 0 ||
          durer > 5 ||
          age + durer > 70 ||
          ageCo + durer > 70
        ) {
          return { invalidDurer: true };
        }
      }

      return null; // La validation a réussi
    };
  }
  // validation pour credit 90%
  creditValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const credit = control.value.replace(/\s+/g, '');
      const bien = this.otherCarAndMoto
        ? this.applyForm.value.bien
          ? this.applyForm.value.bien.replace(/\s+/g, '')
          : ''
        : '';
      if (this.otherCarAndMoto) {
        if (credit > 0.8 * Number(bien)) {
          return { invalidCredit: true };
        }
      } else {
        if (credit > 0.8 * this.prixVehicule) {
          return { invalidCredit: true };
        }
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
      let credit = this.applyForm.value.credit
        ? this.applyForm.value.credit.replace(/\s+/g, '')
        : '';
      let montantDuBien = this.applyForm.value.bien
        ? this.applyForm.value.bien.replace(/\s+/g, '')
        : '';
      const formislamiqueData = {
        revenue: this.applyForm.value.revenue
          ? this.applyForm.value.revenue.replace(/\s+/g, '')
          : '',
        revenueCo: this.applyForm.value.revenueCo
          ? this.applyForm.value.revenueCo.replace(/\s+/g, '')
          : '',
        margeCredit: this.otherCarAndMoto
          ? 0.5 * Number(credit) + Number(credit)
          : 0,
        bien: montantDuBien,
        credit: credit,
        age: this.applyForm.value.age,
        ageCo: this.applyForm.value.ageCo,
        durer: this.applyForm.value.durer,
        revenueCumule: revenueCumule,
        montantDuBien: this.otherCarAndMoto ? montantDuBien : this.prixVehicule,

        idCredit: this.route.snapshot.paramMap.get('id'),
      };

      const formDataJson = JSON.stringify(formislamiqueData);

      localStorage.setItem('formislamiqueData', formDataJson);
      sessionStorage.setItem('formislamiqueData', formDataJson);

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
