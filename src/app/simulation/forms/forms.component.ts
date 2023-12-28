import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  patrimoine: boolean = false;
  coBorrower: boolean = false;
  otherFinancing: boolean = false;
  depot: boolean = false;
  applyForm: FormGroup;

  ngOnInit(): void {
    this.setOtherFinancing(false);
    this.setCoBorrower(false);
    this.setPatrimoine(false);
  }

  constructor(private fb: FormBuilder) {
    this.applyForm = this.fb.group({
      habitation: ['', Validators.required],
      revenue: ['', Validators.required],
      age: ['', Validators.required],
      credit: ['', Validators.required],
      durer: ['', Validators.required],
      revenueCo: ['', Validators.required],
      ageCo: ['', Validators.required],
      patrimoine: ['', Validators.required],
      otherFinancing: ['', Validators.required],
    });
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
      const formData = {
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
        patrimoine: this.applyForm.value.patrimoine
          ? this.applyForm.value.patrimoine.replace(/\s+/g, '')
          : '',
        otherFinancing: this.applyForm.value.otherFinancing
          ? this.applyForm.value.otherFinancing.replace(/\s+/g, '')
          : '',
        age: this.applyForm.value.age,
        ageCo: this.applyForm.value.ageCo,
        durer: this.applyForm.value.durer,
      };

      const formDataJson = JSON.stringify(formData);

      localStorage.setItem('formData', formDataJson);

      console.log('Formulaire soumis avec les valeurs suivantes:', formData);
    } else {
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
