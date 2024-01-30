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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  information: boolean = false;
  submittedPassword: boolean = false;
  public dataForm!: FormGroup;
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


  editMode = false;

toggleEditMode() {
  this.editMode = !this.editMode;
}

updateUserInfo() {
  // Add your logic to handle the update when the "Confirmer" button is clicked
}
}
