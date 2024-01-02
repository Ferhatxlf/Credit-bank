import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  goBack(): void {
    this.location.back();
  }

  handleLogin() {
    console.log('email', this.loginForm.value.email);
    console.log('ps', this.loginForm.value.password);
    this.authService.login(this.loginForm.value);
  }
}
