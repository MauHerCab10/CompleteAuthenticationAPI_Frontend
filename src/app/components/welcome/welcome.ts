import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { UtilityService } from '../../services/utility-service';
import { AccessService } from '../../services/access-service';
import { SessionTimeoutService } from '../../services/session-timeout-service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class WelcomeComponent {
  constructor(
    private _servicioUtilidad: UtilityService,
    private _servicioAcceso: AccessService,
    private _sessionService: SessionTimeoutService
  ){ }

  public screenLoading: boolean = false;
  private router = inject(Router);

  CerrarSesion(){
    let accessToken:string = sessionStorage.getItem('accessToken') ?? "";
    this.screenLoading = true;

    this._servicioAcceso.CerrarSesion(accessToken).subscribe({
      next: (respuesta) => {
        if (respuesta.isSuccess) {
          sessionStorage.removeItem("idUsuario");
          sessionStorage.removeItem("accessToken");

          this.router.navigate(['login']);
          this._sessionService.FinishSessionTime();
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "OK 😊");
        } else {
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "ERROR 😢");
        }
      },
      error:(respuesta) => {
        this.screenLoading = false;
        this.router.navigate(['login']);
        this._servicioUtilidad.MostarAlerta(`${respuesta?.error?.mensaje} ${respuesta?.message}`, "ERROR 😢");
        console.log(respuesta.message);
      },
      complete: () => {
        this.screenLoading = false;
      }
    });
  }

  IrAPrueba(){
    this.router.navigate(['prueba']);
  }

  ngOnInit() {
    this._sessionService.ConfigurarSessionTime();
    this._sessionService.ResetSessionTime();
  }

}