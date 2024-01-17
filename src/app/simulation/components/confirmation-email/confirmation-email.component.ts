import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AuthServiceService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.css'],
})
export class ConfirmationEmailComponent implements OnInit, OnDestroy {
  inputs = Array(6).fill(0);
  inputValues = Array(6).fill(null);
  currentInput = 0;
  id_regestring_user: any;
  messageError: string = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  @ViewChildren('input') inputElements!: QueryList<ElementRef>;
  startTime!: number;

  onKeyup(i: number) {
    if (i === this.currentInput) {
      this.currentInput++;
      this.focusInput(this.currentInput);
    }
  }

  focusInput(index: number): void {
    setTimeout(() => {
      this.inputElements.toArray()[index].nativeElement.focus();
    }, 0);
  }

  submit() {
    let code = this.inputValues.join('');
    console.log(code);
  }

  private subscription!: Subscription;

  ngOnInit() {
    this.startInterval();
    this.startTime = Date.now();
  }

  ngOnDestroy() {
    // Nettoyez l'abonnement lorsque le composant est détruit
    this.stopInterval();
  }

  private startInterval() {
    this.subscription = interval(10000).subscribe(() => {
      const a = localStorage.getItem('id_for_confirmation_email');
      if (a) {
        this.id_regestring_user = JSON.parse(a);
      }
      this.authService.getClient(this.id_regestring_user).subscribe(
        (rs) => {
          if (rs['activated']) {
            const user = {
              token: rs['token'],
              id: rs['id'],

              role: 'particulier',
            };
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.stopIntervalWithNavigation();
          }
        },
        (err) => {
          console.log('erreur', err);
        }
      );

      if (this.isFiveMinutesElapsed()) {
        this.stopInterval();
      }
    });
  }

  private stopIntervalWithNavigation() {
    this.router.navigate(['/simulation/upload']);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private stopInterval() {
    this.messageError =
      "La durée de l'email d'activation a expiré. Veuillez cliquer sur \"Renvoyer l'email d'activation\" pour recevoir un nouveau email.";
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private isFiveMinutesElapsed(): boolean {
    const currentTime = Date.now(); // Obtenez le moment actuel
    const elapsedMinutes = (currentTime - this.startTime) / (1000 * 60); // Calculez le temps écoulé en minutes

    // Vérifiez si 5 minutes se sont écoulées
    return elapsedMinutes >= 5;
  }

  renvoiEmail() {
    this.messageError = '';
  }
}
