import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

//Componentes de Angular Material:
import { MatIconModule } from '@angular/material/icon';
import { UtilityService } from '../../services/utility-service';
import { AccessService } from '../../services/access-service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class WelcomeComponent {
  constructor(
    private _servicioUtilidad: UtilityService,
    private _servicioAcceso: AccessService
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

          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "OK 😊");
          this.router.navigate(['login']);

          // // Finaliza la gestión del tiempo de sesión
          // this._sessionService.logout();
        } else {
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "ERROR 😢");
        }
      },
      error:(respuesta) => {
        this.router.navigate(['login']);
        console.log(respuesta.message);
        this._servicioUtilidad.MostarAlerta(`${respuesta?.error?.mensaje} ${respuesta?.message}`, "ERROR 😢");
      },
      complete: () => {
        this.screenLoading = false;
      }
    });
  }

  IrAPrueba(){
    this.router.navigate(['prueba']);
  }

    // Cambiar estado de pantalla por uno de "Cargando..."
  onChangeLoadingScreen(state: boolean) {
    this.screenLoading = state;
  }

}