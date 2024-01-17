import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../service/websocket.service';

import { HttpErrorResponse } from '@angular/common/http';
import { BanquierService, Banquier } from '../../service/BanquierService';
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
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private webSocketService: WebSocketService,
    private banquierService: BanquierService
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
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (rs) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
        console.log(rs);
        const user = {
          token: rs.token,
          id: rs.client.id,

          role: 'particulier',
        };
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.router.navigate(['/client']);
      },
      (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        // Handle error from server
        console.error('Error from server:', error);

        // You can also check the error details if needed
        if (error instanceof HttpErrorResponse && error.error) {
          console.error('Error Response Body:', error.error);
          alert(error.error);
        }
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

        const banquier: Banquier = {
          id: rs.compte.id,
          token: rs.token,
          agence_id: rs.compte.agenceId,
          nin: rs.compte.nin,
          role: rs.compte.role,
        };

        // Set banquier in the service
        this.banquierService.setBanquier(banquier);

        if (rs.compte.role === 'courtier') {
          this.webSocketService.courtierConnect(rs.compte.id);
          this.router.navigate(['/courtier']);
        } else if (rs.compte.role === 'directeur') {
          this.webSocketService.directorConnect(rs.compte.id);
          this.router.navigate(['/director']);
        } else if (rs.compte.role === 'admin') {
          this.router.navigate(['/admin']);
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
//2eba41bc
