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
  currentUser: any;

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
      const a = localStorage.getItem('currentUser');
      if (a) {
        this.currentUser = JSON.parse(a);
      }
      this.authService.getClient(this.currentUser.id).subscribe(
        (rs) => {
          console.log('vcbls, n;zc, d:', rs);
          if (rs['activated']) {
            this.stopInterval();
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

  private stopInterval() {
    this.router.navigate(['/simulation/upload']);
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
}
