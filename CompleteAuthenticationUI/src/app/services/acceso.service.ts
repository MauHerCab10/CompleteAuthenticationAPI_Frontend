import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appsettings } from '../environments/settings';
import { Login } from '../interfaces/Login';
import { Registro } from '../interfaces/Registro';
import { RespuestaUsuario } from '../interfaces/RespuestaUsuario';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
private baseUrl: string = appsettings.apiURL + "Usuario/";

  constructor(private http: HttpClient) { }

  AutenticarUsuario(usuario:Login): Observable<RespuestaUsuario>
  {
    var respuesta = this.http.post<RespuestaUsuario>(`${this.baseUrl}AutenticarUsuario`, usuario);
    return respuesta;
  }

  RegistrarUsuario(usuario:Registro): Observable<RespuestaUsuario>
  {
    var respuesta = this.http.post<RespuestaUsuario>(`${this.baseUrl}RegistrarUsuario`, usuario);
    return respuesta;
  }

  ValidarToken(token:string): Observable<RespuestaUsuario>
  {
    var respuesta = this.http.get<RespuestaUsuario>(`${this.baseUrl}ValidarToken?token=${token}`);
    return respuesta;
  }
}
