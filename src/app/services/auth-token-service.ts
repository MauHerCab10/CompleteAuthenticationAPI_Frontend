import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //'root' garantiza comportamiento singleton del servicio en toda la app
})
export class AuthTokenService {

  constructor() { }

  //Almacenamiento solo en memoria dentro de una variable normal del runtime Angular
  private accessToken: string | null = null;
  private idUsuario: string | null = null;

  //Access Token
  SetAccessToken(aToken: string) {
    this.accessToken = aToken;
  }

  GetAccessToken(): string | null {
    return this.accessToken;
  }

  ClearAccessToken() {
    this.accessToken = null;
  }

  //Id Usuario
  SetIdUsuario(pIdUsuario: string) {
    this.idUsuario = pIdUsuario;
  }

  GetIdUsuario(): string | null {
    return this.idUsuario;
  }

  ClearIdUsuario() {
    this.idUsuario = null;
  }
}
