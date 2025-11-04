import { inject, Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilityService } from './utility-service';
import { AccessService } from './access-service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private readonly idleTimeout = 15; //Tiempo de inactividad antes q inicie el contador
  private readonly timeoutWarning = 5; //Tiempo q dura el contador antes de cerrar sesión automaticamente
  
  private idle = inject(Idle);
  private router = inject(Router);
  public screenLoading: boolean = false;
  private isConfigured = false;
  
  constructor(
    private _servicioUtilidad: UtilityService,
    private _servicioAcceso: AccessService,
  ) { }

  ConfigurarSessionTime() {
    // evita duplicidad en la configuración del manejo de la sesión con Idle (Singleton)
    if (this.isConfigured)
      return;
    
    this.isConfigured = true;

    // Establece el tiempo de inactividad y advertencia
    this.idle.setIdle(this.idleTimeout); //tiempo de inactividad antes de que aparezca la advertencia con la cuenta regresiva
    this.idle.setTimeout(this.timeoutWarning); //tiempo de advertencia antes de cerrar sesión
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); //establece los eventos predeterminados que reiniciarán el temporizador de inactividad

    this.idle.onIdleStart.subscribe(() => {
      console.log('¡USUARIO INACTIVO! Ha pasado el tiempo de inactividad establecido.');
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      console.log(`La sesión se cerrará en ${countdown} segundos. Por favor, interactúe con la aplicación para continuar activo.`);
    });

    this.idle.onTimeout.subscribe(() => {
      console.log('¡Tiempo agotado! Iniciando cierre de sesión automático...');
      this.Logout();
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          this.ResetSessionTime();
          console.log('Tiempo de sesión reiniciado automáticamente al cambiar de pantalla.');
        }
      });
  }

  Logout() {
    let accessToken:string = sessionStorage.getItem('accessToken') ?? "";
    this.screenLoading = true;

    this._servicioAcceso.CerrarSesion(accessToken).subscribe({
      next: (respuesta) => {
        if (respuesta.isSuccess) {
          sessionStorage.removeItem("idUsuario");
          sessionStorage.removeItem("accessToken");

          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "OK 😊");
          this.router.navigate(['login']);

          this.FinishSessionTime();
        } else {
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "ERROR 😢");
        }
      },
      error:(respuesta) => {
        this.screenLoading = false;
        console.log(respuesta.message);
        this._servicioUtilidad.MostarAlerta(`${respuesta?.error?.mensaje} ${respuesta?.message}`, "ERROR 😢");
      },
      complete: () => {
        this.screenLoading = false;
      }
    });
  }

  //Inicio de la sesión
  ResetSessionTime() {
    this.idle.watch();
    console.log('Monitoreo de inactividad iniciado...');
  }

  //Finalización de la sesión
  FinishSessionTime() {
    this.idle.stop();
    console.log('¡Sesión cerrada exitosamente!');
  }

}