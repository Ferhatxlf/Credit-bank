import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../service/client-service.service';
import { AuthServiceService } from '../../service/auth-service.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import * as dataJson from '../../algeria-postcodes.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  dataJson: any = (dataJson as any).default;
  uniqueData: any;
  communes: any;

  defaultCity = 'default';
  defaultCommune = 'default';
  information: boolean = false;
  updateInformation: boolean = false;
  submittedPassword: boolean = false;
  nom: string = '';
  public dataForm!: FormGroup;
  public informationForm!: FormGroup;
  currentUser: any;
  public Folders: any = [];
  constructor(
    private clientService: ClientServiceService,
    private authService: AuthServiceService,
    private fb: FormBuilder
  ) {
    this.dataForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, this.passwordPolicyValidator]],
      passwordConfirmation: [
        '',
        [Validators.required, this.passwordMatchValidator()],
      ],
    });
  }
  ngAfterViewInit() {
    this.informationForm
      .get('wilaya')
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
    this.informationForm
      .get('commune')
      ?.valueChanges.subscribe((selectedCommune) => {
        console.log(selectedCommune, 'Valeur de selectedCommune');
        const selectedCommuneData = this.dataJson.find(
          (item) => item.commune_name_ascii === selectedCommune
        );
      });
    this.informationForm
      .get('wilaya')
      ?.valueChanges.subscribe((selectedWilaya: string) => {
        if (selectedWilaya) {
          this.informationForm.get('commune')?.enable();
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

  ngOnInit(): void {
    this.information = true;
    const a = localStorage.getItem('currentUser');
    if (a) {
      this.currentUser = JSON.parse(a);
    }
    this.authService.getClient(this.currentUser.id).subscribe(
      (rs) => {
        console.log(rs);
        this.Folders = rs;

        this.informationForm = this.fb.group({
          nom: this.fb.control(this.Folders.nom),
          prenom: this.fb.control(this.Folders.prenom),
          email: this.fb.control(this.Folders.email),
          tel: this.fb.control(this.Folders.telephone),
          adresse: this.fb.control(this.Folders.adresse),
          wilaya: this.fb.control(this.Folders.commune.wilaya.wilayaName),
          commune: this.fb.control(this.Folders.commune.nom),
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.dataForm.get('newPassword')?.valueChanges.subscribe((pass: any) => {
      if (isNaN(pass) || pass > 40) {
        // Déclenchez manuellement la validation de la durée
        this.dataForm.get('passwordConfirmation')?.updateValueAndValidity();
      }
    });
    this.uniqueData = Array.from(
      new Set(this.dataJson.map((item) => item.wilaya_name_ascii))
    ).map((wilaya_name_ascii) => {
      return this.dataJson.find(
        (item) => item.wilaya_name_ascii === wilaya_name_ascii
      );
    });
  }
  passwordPolicyValidator(control: FormControl) {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const hasSpecial = /[!@#$%^&*]/.test(control.value);
    const length = control.value.length >= 8;
    // return null if all conditions are true, otherwise an error object
    return hasNumber && hasUpper && hasLower && hasSpecial && length
      ? null
      : { passwordWeak: true };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const newPassword = this.dataForm?.get('newPassword')?.value;
      const confirmPassword = this.dataForm?.get('passwordConfirmation')?.value;
      if (newPassword !== confirmPassword) {
        return { invalidDurer: true };
      }

      return null; // La validation a réussi
    };
  }

  setPassword() {
    if (this.dataForm.valid) {
      let oldPassword = this.dataForm.value.oldPassword;
      let newPassword = this.dataForm.value.newPassword;
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      this.clientService.setPassword(data, this.currentUser.id).subscribe(
        (rs) => {
          this.information = true;
          console.log(rs);

          console.log(rs);

          alert('Mot de passe mis à jour avec succès');
        },
        (err) => {
          console.log(err);
          if (err.error === 'Ancien mot de passe incorrect') {
            alert('mot de passe actuel incorrect');
          } else if (err.error === "Client introuvable avec l'ID fourni") {
            alert("Client introuvable avec l'ID fourni");
          }
        }
      );
    } else {
      this.submittedPassword = true;
    }
  }

  updateParticulier() {
    console.log('lkdjfnzmfnalmnvk', this.informationForm.value);

    const Data = {
      nom: this.informationForm.value.nom,
      prenom: this.informationForm.value.prenom,
      email: this.informationForm.value.email,
      telephone: this.informationForm.value.tel,
      adresse: this.informationForm.value.adresse,
      wilaya: this.informationForm.value.wilaya,
      nocommune: this.informationForm.value.commune, //ilaq id commune  code postal
    };

    console.log('Data:', Data);

    this.clientService.updateProfile(this.currentUser.id, Data).subscribe(
      (rs) => {
        console.log('Update successful:', rs);
        alert('Informations modifiées avec succès');
      },
      (err) => {
        console.error('Update failed:', err);
        alert('Erreur lors de la modification des informations: ' + err.error);
      }
    );
  }
}
