import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../service/websocket.service';

import { HttpErrorResponse } from '@angular/common/http';
import { BanquierService, Banquier } from '../../service/BanquierService';
@Component({
  selector: 'app-login-banquier',
  templateUrl: './login-banquier.component.html',
  styleUrl: './login-banquier.component.css',
})
export class LoginBanquierComponent {
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
    this.banquierForm = this.fb.group({
      nin: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  goBack(): void {
    this.location.back();
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
}
