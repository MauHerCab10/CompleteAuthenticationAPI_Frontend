import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionTimeoutService } from '../services/session-timeout-service';
import { tap } from 'rxjs/operators';

/**
 * Interceptor que resetea el timer de sesión en cada request HTTP
 */
export const httpTimeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionTimeoutService);

  // Solo resetear timer si la sesión está activa y no es una request de login/logout
  const shouldResetTimer = sessionService.isSessionActive() && 
    !req.url.includes('/login') && 
    !req.url.includes('/logout');

  if (shouldResetTimer) {
    sessionService.resetTimer();
  }

  return next(req).pipe(
    tap({
      next: (response) => {
        // También resetear timer en respuestas exitosas
        if (shouldResetTimer) {
          sessionService.resetTimer();
        }
      },
      error: (error) => {
        // Si el servidor responde con 401 (no autorizado), cerrar sesión
        if (error.status === 401) {
          sessionService.logout();
        }
      }
    })
  );
};