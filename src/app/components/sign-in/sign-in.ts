import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SessionTimeoutService } from '../../services/session-timeout-service';
import { AccessService } from '../../services/access-service';
import { UtilityService } from '../../services/utility-service';
import { Login } from '../../interfaces/Login';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignInComponent {
  constructor(
    private _servicioUtilidad: UtilityService,
    private _servicioAcceso: AccessService,
    private _sessionService: SessionTimeoutService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ){ }

  @Output() socialLogin = new EventEmitter<string>();
  @Output() signInSubmit = new EventEmitter<any>();
  @Output() forgotPassword = new EventEmitter<void>();
  @Output() screenLoadingChange = new EventEmitter<boolean>();

  ocultarPassword: boolean = true;
  private router = inject(Router);
  public fb = inject(FormBuilder);

  // Propiedades para el formulario de SignIn
  public formSignIn: FormGroup = this.fb.group({
    email: ["", Validators.required],
    contrasena: ["", Validators.required],
  });


  // Manejar envío del formulario de SignIn
  IniciarSesion(){
    this.formSignIn.markAllAsTouched();

    if(this.formSignIn.invalid) {
      this._servicioUtilidad.MostarAlerta("Diligencie primero todos los campos obligatorios antes de proceder", "ERROR");
      return;
    }

    this.screenLoadingChange.emit(true);

    let login: Login = {
      email: this.formSignIn.value.email,
      contrasena: this.formSignIn.value.contrasena,
    }

    this._servicioAcceso.LoginUsuario(login).subscribe({
      next: (respuesta) => {
        if (respuesta.isSuccess) {
          
          sessionStorage.setItem("idUsuario", respuesta.idUsuario.toString());
          sessionStorage.setItem("accessToken", respuesta.accessToken);
          
          this.router.navigate(['inicio']);
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "OK 😊");

          // // Iniciar la gestión del tiempo de sesión
          // this._sessionService.startSession();
        } else {
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "ERROR 😢");
        }
      },
      error:(respuesta) => {
        console.log(respuesta.message);
        this._servicioUtilidad.MostarAlerta(`${respuesta?.error?.mensaje} ${respuesta?.message}`, "ERROR 😢");
      },
      complete: () => {
        this.screenLoadingChange.emit(false);
      }
    });
  }

  // Manejar el Login con Redes Sociales
  onSocialLogin(provider: string) {
    console.log(`Login desde SignIn con ${provider}`);
    this.socialLogin.emit(provider);
    // implementar lógica para procesar el Login con redes sociales
  }

  // Manejar forgot password
  onForgotPassword() {
    this.forgotPassword.emit();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['confirmacion'] === 'ok') {
        this._servicioUtilidad.MostarAlerta('¡Su cuenta ha sido confirmada exitosamente 😊!', "✅", "center");
      } else if (params['confirmacion'] === 'error') {
        this._servicioUtilidad.MostarAlerta('¡El enlace es inválido o ya ha expirado 😢!', "❌", "center");
      }
    });
  }

}