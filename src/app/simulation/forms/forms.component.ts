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
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  revenueImmobilier: boolean = false;
  coBorrower: boolean = false;
  otherRevenue: boolean = false;
  otherFinancing: boolean = false;
  rurale: boolean = false;

  depot: boolean = false;
  dureeMax1: number = 30;
  dureeMax2: number = 30;

  habitation: any;
  applyForm: FormGroup;

  ngOnInit(): void {
    this.setOtherFinancing(false);
    this.setCoBorrower(false);
    this.setRevenueImmobilier(false);
    this.setOtherRevenue(false);
    const immobilierType = localStorage.getItem('immobilierType');
    const formImmobilierData = sessionStorage.getItem('formImmobilierData');

    if (immobilierType === "Construction d'un logement rural (Bonifié)") {
      this.rurale = true;
    }
    // recuperer les valeurs soumité
    if (formImmobilierData) {
      const formDataJson = JSON.parse(formImmobilierData);
      this.applyForm.patchValue(formDataJson);
    }
    this.applyForm.get('age')?.valueChanges.subscribe((age: number) => {
      if (isNaN(age) || age > 45) {
        this.dureeMax1 = 75 - Number(age);

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      } else if (isNaN(age) || age < 45) {
        this.dureeMax1 = 30;

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      }
    });
    this.applyForm.get('ageCo')?.valueChanges.subscribe((age: number) => {
      if (isNaN(age) || age > 45) {
        this.dureeMax2 = 75 - Number(age);

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      } else if (isNaN(age) || age < 45) {
        this.dureeMax2 = 30;

        // Déclenchez manuellement la validation de la durée
        this.applyForm.get('durer')?.updateValueAndValidity();
      }
    });
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
      habitation: [
        '',
        [Validators.required, this.habitationValidatorFactory()],
      ],
      revenue: ['', Validators.required],
      age: ['', [Validators.required, this.ageValidator]],
      credit: ['', [Validators.required, this.creditValidatorFactory()]],
      durer: ['', [Validators.required, this.durerValidatorFactory()]],
      revenueCo: ['', Validators.required],
      ageCo: ['', [Validators.required, this.ageValidator]],
      revenueImmobilier: ['', Validators.required],
      otherRevenue: ['', Validators.required],
      otherFinancing: ['', Validators.required],
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

      if (isNaN(durer) || durer < 0 || durer > 30) {
        return { invalidDurer: true };
      }

      // Vérifier si l'âge et la durée dépassent 75 ans
      if (age + durer > 75 || ageCo + durer > 75) {
        return { ageDurerExceeds75: true };
      }

      return null; // La validation a réussi
    };
  }
  // validation pour credit 90%
  creditValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const credit = control.value.replace(/\s+/g, '');
      const habitation = this.applyForm
        ?.get('habitation')
        ?.value.replace(/\s+/g, '');
      console.log(credit, habitation);
      // Vérifier si le crédit dépasse 90% du montant de l'habitation
      if (this.rurale ? credit > 2100000 : credit > 0.9 * habitation) {
        return { invalidCredit: true };
      }

      return null; // La validation a réussi
    };
  }
  // interdiction de depasser 12000000
  habitationValidatorFactory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const habitation = control.value.replace(/\s+/g, '');

      // Vérifier si le crédit dépasse 90% du montant de l'habitation
      if (this.rurale ? habitation > 2800000 : habitation > 12000000) {
        return { invalidHabitation: true };
      }

      return null; // La validation a réussi
    };
  }
  setRevenueImmobilier(value: boolean) {
    this.revenueImmobilier = value;
    if (!value) {
      this.applyForm.get('revenueImmobilier')?.reset();
      this.applyForm.get('revenueImmobilier')?.disable();
    } else {
      this.applyForm.get('revenueImmobilier')?.enable();
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
  setOtherRevenue(value: boolean) {
    this.otherRevenue = value;
    if (!value) {
      this.applyForm.get('otherRevenue')?.reset();
      this.applyForm.get('otherRevenue')?.disable();
    } else {
      this.applyForm.get('otherRevenue')?.enable();
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
        : '0';
      let revenueCo = this.applyForm.value.revenueCo
        ? this.applyForm.value.revenueCo.replace(/\s+/g, '')
        : '0';
      let OtherRevenue = this.applyForm.value.otherRevenue
        ? this.applyForm.value.otherRevenue.replace(/\s+/g, '')
        : '0';
      let revenueImmobilier = this.applyForm.value.revenueImmobilier
        ? this.applyForm.value.revenueImmobilier.replace(/\s+/g, '')
        : '0';
      let otherFinancing = this.applyForm.value.otherFinancing
        ? this.applyForm.value.otherFinancing.replace(/\s+/g, '')
        : '0';
      let revenueCumule =
        Number(revenue) +
        Number(revenueCo) +
        Number(OtherRevenue) +
        Number(revenueImmobilier);

      const formImmobilierData = {
        habitation: this.applyForm.value.habitation
          ? this.applyForm.value.habitation.replace(/\s+/g, '')
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
        revenueImmobilier: this.applyForm.value.revenueImmobilier
          ? this.applyForm.value.revenueImmobilier.replace(/\s+/g, '')
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
      console.log('revenue cumulé ', revenueCumule);
      const formDataJson = JSON.stringify(formImmobilierData);

      localStorage.setItem('formImmobilierData', formDataJson);
      sessionStorage.setItem('formImmobilierData', formDataJson);

      console.log(
        'Formulaire soumis avec les valeurs suivantes:',
        formImmobilierData
      );
      this.router.navigate(['/simulation/result']);
    } else {
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
