import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  client: boolean = true;
  banquier: boolean = false;
  loginForm!: FormGroup;
  banquierForm!: FormGroup;
  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
    });

    this.banquierForm = this.fb.group({
      nin: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  goBack(): void {
    this.location.back();
  }

  clientLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (rs) => {
        console.log(rs);
        const user = {
          token: rs.token,
          id: rs.client.id,
        };
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.router.navigate(['/client']);
      },
      (error) => {
        console.error('Erreur de connexion:', error);
      }
    );
  }

  banquierLogin() {
    this.authService.banquierLogin(this.banquierForm.value).subscribe(
      (rs) => {
        console.log(rs);
        const user = {
          token: rs.token,
          id: rs.compte.id,
          agence_id: rs.compte.agenceId,
          nin: rs.compte.nin,
          role: rs.compte.role,
        };
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (rs.compte.role === 'courtier') {
          this.router.navigate(['/courtier']);
        } else if (rs.compte.role === 'directeur') {
          this.router.navigate(['/director']);
        }
      },
      (error) => {
        console.error('Erreur de connexion:', error);
      }
    );
  }

  onChangeConnexion() {
    if (this.client) {
      this.client = false;
      this.banquier = true;
    } else {
      this.client = true;
      this.banquier = false;
    }
  }
}
