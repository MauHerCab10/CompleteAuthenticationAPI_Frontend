import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AccessService } from '../../services/access-service';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
  constructor(
    private _servicioAcceso: AccessService
  ){ }

  public screenLoading: boolean = false;
  private router = inject(Router);

  Ping(){
    let accessToken:string = sessionStorage.getItem('accessToken') ?? "";
    this.screenLoading = true;

    this._servicioAcceso.Ping(accessToken).subscribe({
      next: (respuesta) => {
        if (respuesta) {
          console.log(respuesta);
        } else {
          console.log(respuesta);
        }
      },
      error:(respuesta) => {
        this.screenLoading = false;
        console.log(respuesta);
      },
      complete: () => {
        this.screenLoading = false;
      }
    });
  }

  RegresarAInicio(){
    this.router.navigate(['inicio']);
  }

}
