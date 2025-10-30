import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private readonly TIMEOUT_DURATION = 3 * 60 * 1000; // 3 minutos en millisegundos
  private timeoutSubscription?: Subscription;
  private sessionActive = new BehaviorSubject<boolean>(true);
  
  public sessionActive$ = this.sessionActive.asObservable();

  constructor(private router: Router) {}

  /**
   * Inicia o reinicia el timer de timeout de sesión
   */
  resetTimer(): void {
    this.clearTimer();
    
    this.timeoutSubscription = timer(this.TIMEOUT_DURATION).subscribe(() => {
      this.logout();
    });
  }

  /**
   * Detiene el timer actual
   */
  private clearTimer(): void {
    if (this.timeoutSubscription) {
      this.timeoutSubscription.unsubscribe();
      this.timeoutSubscription = undefined;
    }
  }

  /**
   * Cierra la sesión y redirige al login
   */
  logout(): void {
    this.clearTimer();
    this.sessionActive.next(false);
    
    // Limpiar AccessToken del SessionStorage
    sessionStorage.removeItem('accessToken');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  /**
   * Inicia una nueva sesión
   */
  startSession(): void {
    this.sessionActive.next(true);
    this.resetTimer();
  }

  /**
   * Verifica si la sesión está activa
   */
  isSessionActive(): boolean {
    return this.sessionActive.value;
  }

  /**
   * Destruye el servicio y limpia recursos
   */
  destroy(): void {
    this.clearTimer();
  }
}