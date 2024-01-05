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
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  goBack(): void {
    this.location.back();
  }

  clientLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (rs) => {
        this.authService.setToken(rs.token);
        console.log(rs.token);
        this.router.navigate(['/client']);
      },
      (error) => {
        console.error('Erreur de connexion:', error);
      }
    );
  }

  banquierLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (rs) => {
        this.authService.setToken(rs.token);
        console.log(rs.token);
        this.router.navigate(['/client']);
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
