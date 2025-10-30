import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SessionTimeoutService } from '../app/services/session-timeout-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private sessionService = inject(SessionTimeoutService);
  private sessionSubscription?: Subscription;
  
  isSessionActive = true;

  ngOnInit(): void {
    // Suscribirse al estado de la sesión
    this.sessionSubscription = this.sessionService.sessionActive$.subscribe(
      (active) => {
        this.isSessionActive = active;
      }
    );

    // Iniciar la sesión si hay un AccessToken válido
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      this.sessionService.startSession();
    }
  }

  ngOnDestroy(): void {
    this.sessionSubscription?.unsubscribe();
    this.sessionService.destroy();
  }
}
