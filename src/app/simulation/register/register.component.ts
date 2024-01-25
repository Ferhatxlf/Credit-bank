import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { SimulationServiceService } from '../../service/simulation-service.service';
import * as dataJson from '../../algeria-postcodes.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, AfterViewInit {
  data: any;
  dataJson: any = (dataJson as any).default;
  uniqueData: any;
  selectedWilaya: any;
  communes: any;
  selectedCommune: any;
  postCode: any;
  defaultPostCode: string = '';
  applyForm: FormGroup;
  applyFormSignIn: FormGroup;
  defaultCivility = 'default';
  defaultCity = 'default';
  defaultCommune = 'default';
  defaultMaritalStatus = 'default';
  submitted: boolean = false;
  submittedSignIn: boolean = false;
  nationnalitee: boolean = true;
  pays: boolean = true;
  toggleRegisterLogin: boolean = true;
  s: any;
  type!: number;
  montant!: number;
  @Output() loading = new EventEmitter<boolean>();

  ngAfterViewInit() {
    // Mettez à jour defaultCivilite ici après la première vérification des changements
    this.defaultCivility = 'default';
    this.defaultMaritalStatus = 'default';
    this.defaultCity = 'default';
    this.defaultCommune = 'default';
    this.applyForm
      .get('selectedWilaya')
      ?.valueChanges.subscribe((selectedWilaya) => {
        console.log(selectedWilaya, 'Valeur de selectedWilaya');
        this.communes = this.dataJson.filter(
          (item) => item.wilaya_name_ascii === selectedWilaya
        );

        // Créer un tableau distinct des noms de communes
        const uniqueCommunes = this.removeDuplicates(
          this.communes,
          'commune_name_ascii'
        );

        // Mettez à jour le tableau des communes avec les valeurs uniques
        this.communes = uniqueCommunes;
        this.communes.sort((a, b) =>
          a.commune_name_ascii.localeCompare(b.commune_name_ascii)
        );
      });
    this.applyForm
      .get('selectedCommune')
      ?.valueChanges.subscribe((selectedCommune) => {
        console.log(selectedCommune, 'Valeur de selectedCommune');
        const selectedCommuneData = this.dataJson.find(
          (item) => item.commune_name_ascii === selectedCommune
        );

        // Mettez à jour defaultPostCode avec le post_code correspondant
        this.defaultPostCode = selectedCommuneData
          ? selectedCommuneData.post_code
          : '';
      });
    this.applyForm
      .get('selectedWilaya')
      ?.valueChanges.subscribe((selectedWilaya: string) => {
        if (selectedWilaya) {
          this.applyForm.get('selectedCommune')?.enable();
        }
      });
  }
  // Supprimer les commune redondante
  removeDuplicates(array, key) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((el) => el[key] === obj[key])
    );
  }

  ngOnInit() {
    this.pays = true;
    this.nationnalitee = true;
    this.setNationnalite(true);
    this.applyForm.get('selectedCommune')?.disable();
    this.applyForm.get('postCode')?.disable();
    // affichier les wilaya non redondante
    this.uniqueData = Array.from(
      new Set(this.dataJson.map((item) => item.wilaya_name_ascii))
    ).map((wilaya_name_ascii) => {
      return this.dataJson.find(
        (item) => item.wilaya_name_ascii === wilaya_name_ascii
      );
    });
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
      // city: ['', [Validators.required, this.nameValidator]],
      // postCode: ['', [Validators.required, Validators.minLength(5)]],
      nationality: ['', [Validators.required, this.nameValidator]],
      civility: ['', [Validators.required, this.civilityValidator]],
      maritalStatus: ['', [Validators.required, this.maritalStatusValidator]],
      selectedWilaya: ['', [Validators.required, this.cityValidator]],
      selectedCommune: ['', [Validators.required, this.communeValidator]],
      postCode: [''],
    });
    this.applyFormSignIn = this.fb.group({
      emailConnexion: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
  cityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;

    if (name == 'default') {
      return { invalidName: true };
    }
    return null; // La validation a réussi
  }
  communeValidator(
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
      this.simulationService.annoncerLoading(true);
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
        // codePostal: this.applyForm.value.postCode
        //   ? this.applyForm.value.postCode.replace(/\s+/g, '')
        //   : '',
        adresse: this.applyForm.value.address,
        // ville: this.applyForm.value.city,
        nationalite: this.applyForm.value.nationality
          ? this.applyForm.value.nationality
          : 'Algerienne',
        civilite: this.applyForm.value.civility,
        maritalStatus: this.applyForm.value.maritalStatus,
        selectedWilaya: this.applyForm.value.selectedWilaya,
        selectedCommune: this.applyForm.value.selectedCommune,
        codePostal: this.defaultPostCode,
      };
      const formDataJson = JSON.stringify(formRegisterData);

      localStorage.setItem('formRegisterData', formDataJson);

      console.log(
        'Formulaire d inscription soumis avec les valeurs suivantes:',
        formRegisterData
      );

      this.authService.register(formDataJson).subscribe(
        (rs) => {
          const t = localStorage.getItem('financementType');
          if (t === 'immobilier') {
            this.s = localStorage.getItem('formImmobilierData');
            this.type = 1;
          } else if (t === 'consomation') {
            this.s = localStorage.getItem('formConsomationData');
            this.type = 2;
          } else if (t === 'islamique') {
            this.s = localStorage.getItem('formislamiqueData');
            this.type = 3;
          }
          if (this.s) {
            const simulationData = JSON.parse(this.s);
            this.data = simulationData;
            if (this.type === 1) {
              this.montant = this.data.montantHabitation;
            } else if (this.type === 2) {
              this.montant = this.data.consommation;
            } else if (this.type === 3) {
              this.montant = this.data.montantDuBien;
            }
          }
          console.log(this.data);
          console.log(rs);
          localStorage.setItem('id_for_confirmation_email', rs['id']);
          const dossier = {
            nomDossier: 'achat dune habitation',
            client: {
              id: rs['id'],
            },
            typeCredit: { id: this.data.idCredit },
            montantHabitation: this.montant,
            creditSouhaite: this.data.credit,
            revenueEmprunteur: this.data.revenue,
            revenueCoEmprunteur: this.data.revenueCo,
            montantAutreFinancementEnCours: this.data.autherFinancing,
            montantRevenueImmobilier: this.data.revenuImobilier,
            ageEmprunteur: this.data.age,
            ageCoEmprunteur: this.data.ageCo,
            dureeFinancement: this.data.durer,
            montantAutreRevenue: 0,
          };

          const d = JSON.stringify(dossier);
          console.log('-----------------d', d);

          this.simulationService.addDossier(d).subscribe(
            (rs) => {
              console.log('dossier cree', rs);
              localStorage.setItem('id_for_upload_docs', rs['id']);
              setTimeout(() => {
                this.simulationService.annoncerLoading(false);
              }, 200);
              localStorage.removeItem('formImmobilierData');
              this.router.navigate(['/simulation/confirmation']);
            },
            (error) => {
              this.simulationService.annoncerLoading(false);
              console.error('Erreur de connexion:', error);
            }
          );
        },
        (error) => {
          this.simulationService.annoncerLoading(false);

          if (error.error === 'Email already exists') {
            alert("L'email existe déja dans la base de données");
          } else {
            alert(error.error);
          }

          console.error('Erreur de connexion:', error);
        }
      );
    } else {
      this.simulationService.annoncerLoading(false);
      this.submitted = true;
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
  submitFormSignIn() {
    if (this.applyFormSignIn.valid) {
      this.loading.emit(true);
      const formSignInData = {
        email: this.applyFormSignIn.value.emailConnexion,
        password: this.applyFormSignIn.value.password,
      };
      console.log(formSignInData, 'data de connexion');

      this.authService.login(formSignInData).subscribe(
        (rs) => {
          console.log(rs);
          const user = {
            token: rs.token,
            id: rs.client.id,

            role: 'particulier',
          };
          localStorage.setItem('currentUser', JSON.stringify(user));

          const t = localStorage.getItem('financementType');
          if (t === 'immobilier') {
            this.s = localStorage.getItem('formImmobilierData');
            this.type = 1;
          } else if (t === 'consomation') {
            this.s = localStorage.getItem('formConsomationData');
            this.type = 2;
          } else if (t === 'islamique') {
            this.s = localStorage.getItem('formislamiqueData');
            this.type = 3;
          }
          if (this.s) {
            const simulationData = JSON.parse(this.s);
            this.data = simulationData;
            if (this.type === 1) {
              this.montant = this.data.montantHabitation;
            } else if (this.type === 2) {
              this.montant = this.data.consommation;
            } else if (this.type === 3) {
              this.montant = this.data.montantDuBien;
            }
          }
          console.log(this.data);
          console.log(rs);
          const dossier = {
            nomDossier: 'achat dune habitation',
            client: {
              id: user.id,
            },
            typeCredit: { id: this.data.idCredit },
            montantHabitation: this.montant,
            creditSouhaite: this.data.credit,
            revenueEmprunteur: this.data.revenue,
            revenueCoEmprunteur: this.data.revenueCo,
            montantAutreFinancementEnCours: this.data.autherFinancing,
            montantRevenueImmobilier: this.data.revenuImobilier,
            ageEmprunteur: this.data.age,
            ageCoEmprunteur: this.data.ageCo,
            dureeFinancement: this.data.durer,
            montantAutreRevenue: 0,
          };

          const d = JSON.stringify(dossier);
          console.log('-----------------d', d);

          this.simulationService.addDossier(d).subscribe(
            (rs) => {
              console.log('dossier cree', rs);
              localStorage.setItem('id_for_upload_docs', rs['id']);

              this.router.navigate(['/client']);
            },
            (error) => {
              console.error('Erreur de connexion:', error);
            }
          );
        },
        (error) => {
          if (error.error === 'Invalid credentials') {
            alert('Email ou mot de passe incorrect !');
          } else if (error.error === 'Account is not activated') {
            alert("Votre compte n'est pas activé !");
          } else if (error.error === 'Email or password missing') {
            alert('Veuillez remplire les champs !');
          }
          console.error('Erreur de connexion:', error);
        }
      );
    } else {
      this.submittedSignIn = true;
      console.log(
        'Le formulaire de connexion est invalide. Veuillez corriger les erreurs.'
      );
    }
  }
}
