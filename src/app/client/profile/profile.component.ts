import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../service/client-service.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  information: boolean = false;

  public dataForm!: FormGroup;
  currentUser: any;
  public Folders: any = [];
  constructor(
    private clientService: ClientServiceService,
    private authService: AuthServiceService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.dataForm = this.fb.group({
      oldPassword: this.fb.control(''),
      newPassword: this.fb.control(''),
      passwordConfirmation: this.fb.control(''),
    });
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
  }

  setPassword() {
    // 442f534d

    const oldPassword = this.dataForm.value.oldPassword;
    const newPassword = this.dataForm.value.newPassword;
    const confirmation = this.dataForm.value.passwordConfirmation;
    console.log(oldPassword, newPassword, confirmation);

    if (oldPassword === '' || newPassword === '' || confirmation === '') {
      alert('Veuillez remplir tous les champs !');
    } else if (newPassword !== confirmation) {
      alert('Confirmation du mot de passe incorrect !');
    } else if (newPassword.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères !');
    } else if (!/[a-z]/.test(newPassword)) {
      alert('Le mot de passe doit contenir au moins une minuscule !');
    } else if (!/[A-Z]/.test(newPassword)) {
      alert('Le mot de passe doit contenir au moins une majuscule !');
    } else if (!/\d/.test(newPassword)) {
      alert('Le mot de passe doit contenir au moins un chiffre !');
    } else if (/\d{3,}/.test(newPassword)) {
      alert(
        'Le mot de passe ne peut pas contenir une séquence numérique de 3 chiffres ou plus !'
      );
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      alert('Le mot de passe doit contenir au moins un caractère spécial !');
    } else {
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      this.clientService.setPassword(data, this.currentUser.id).subscribe(
        (rs) => {
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
    }
  }
}
