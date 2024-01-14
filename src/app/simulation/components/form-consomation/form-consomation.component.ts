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
  selector: 'app-form-consomation',
  templateUrl: './form-consomation.component.html',
  styleUrls: ['./form-consomation.component.css'],
})
export class FormConsomationComponent implements OnInit {
  patrimoine: boolean = false;
  coBorrower: boolean = false;
  otherFinancing: boolean = false;
  depot: boolean = false;
  dureeMax1: number = 5;
  dureeMax2: number = 5;
  vehicule: boolean = false;
  applyForm: FormGroup;

  ngOnInit(): void {
    this.setOtherFinancing(false);
    this.setCoBorrower(false);
    this.setPatrimoine(false);
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
    const Consomationtype = localStorage.getItem('consomationType');
    if (Consomationtype) {
      if (Consomationtype === 'véhicule a usage touristique') {
        this.vehicule = true;
      }
    }
  }
  get dureeMax(): number {
    return Math.min(this.dureeMax1, this.dureeMax2);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.applyForm = this.fb.group({
      consommation: [
        '',
        [Validators.required, this.consomationValidatorFactory()],
      ],
      revenue: ['', Validators.required],
      age: ['', [Validators.required, this.ageValidator]],
      credit: ['', [Validators.required, this.creditValidatorFactory()]],
      durer: ['', [Validators.required, this.durerValidatorFactory()]],
      revenueCo: ['', Validators.required],
      ageCo: ['', [Validators.required, this.ageValidator]],
      patrimoine: ['', Validators.required],
      otherFinancing: ['', Validators.required],
    });
  }
  // Fonction de validation personnalisée pour l'âge
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const age = Number(control.value);

    if (isNaN(age) || age < 19 || age > 70) {
      return { invalidAge: true };
    }

    return null; // La validation a réussi
  }

  // validation pour la duree a 5ans
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
      const consommation = this.applyForm
        ?.get('consommation')
        ?.value.replace(/\s+/g, '');

      // Vérifier si le crédit dépasse 90% du montant de l'habitation
      if (credit > 0.7 * consommation) {
        return { invalidCredit: true };
      }

      return null; // La validation a réussi
    };
  }
  // validation pour consomation
  consomationValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const consomation = control.value.replace(/\s+/g, '');

      // Vérifier si le crédit dépasse 90% du montant de l'habitation
      if (consomation < 500000 || consomation > 3500000) {
        return { invalidConsomation: true };
      }

      return null; // La validation a réussi
    };
  }
  setPatrimoine(value: boolean) {
    this.patrimoine = value;
    if (!value) {
      this.applyForm.get('patrimoine')?.reset();
      this.applyForm.get('patrimoine')?.disable();
    } else {
      this.applyForm.get('patrimoine')?.enable();
    }
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
  setOtherFinancing(value: boolean) {
    this.otherFinancing = value;
    if (!value) {
      this.applyForm.get('otherFinancing')?.reset();
      this.applyForm.get('otherFinancing')?.disable();
    } else {
      this.applyForm.get('otherFinancing')?.enable();
    }
  }

  setDepot(value: boolean) {
    this.depot = value;
  }
  submitted: boolean = false;

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
      const formConsomationData = {
        consommation: this.applyForm.value.consommation
          ? this.applyForm.value.consommation.replace(/\s+/g, '')
          : '',
        credit: this.applyForm.value.credit
          ? this.applyForm.value.credit.replace(/\s+/g, '')
          : '',
        revenue: this.applyForm.value.revenue
          ? this.applyForm.value.revenue.replace(/\s+/g, '')
          : '',
        revenueCo: this.applyForm.value.revenueCo
          ? this.applyForm.value.revenueCo.replace(/\s+/g, '')
          : '',
        patrimoine: this.applyForm.value.patrimoine
          ? this.applyForm.value.patrimoine.replace(/\s+/g, '')
          : '',
        otherFinancing: this.applyForm.value.otherFinancing
          ? this.applyForm.value.otherFinancing.replace(/\s+/g, '')
          : '',
        age: this.applyForm.value.age,
        ageCo: this.applyForm.value.ageCo,
        durer: this.applyForm.value.durer,
        revenueCumule: revenueCumule,
        idCredit: this.route.snapshot.paramMap.get('id'),
      };

      const formDataJson = JSON.stringify(formConsomationData);

      localStorage.setItem('formConsomationData', formDataJson);

      console.log(
        'Formulaire soumis avec les valeurs suivantes:',
        formConsomationData
      );
      this.router.navigate(['/simulation/result']);
    } else {
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
