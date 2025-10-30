import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccessService } from '../../services/access-service';
import { UtilityService } from '../../services/utility-service';
import { Registro } from '../../interfaces/Registro';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUpComponent {
  constructor(
    private _servicioUtilidad: UtilityService,
    private _servicioAcceso: AccessService
  ){ }

  @Output() socialLogin = new EventEmitter<string>();
  @Output() signUpSubmit = new EventEmitter<any>();
  @Output() registroExitoso = new EventEmitter<void>();
  @Output() screenLoadingChange = new EventEmitter<boolean>();

  private router = inject(Router);
  public fb = inject(FormBuilder);
  
  // Propiedades para el formulario de SignUp
  public formSignUp: FormGroup = this.fb.group({
    nombreApellido: ["", Validators.required],
    email: ["", Validators.required],
    contrasena: ["", Validators.required],
  });


  RegistrarUsuario(){
    this.formSignUp.markAllAsTouched();

    if (this.formSignUp.invalid) {
      this._servicioUtilidad.MostarAlerta("Diligencie primero todos los campos obligatorios antes de proceder", "ERROR");
      return;
    }

    this.screenLoadingChange.emit(true);

    let registro: Registro = {
      nombreApellido: this.formSignUp.value.nombreApellido,
      email: this.formSignUp.value.email,
      contrasena: this.formSignUp.value.contrasena
    }

    this._servicioAcceso.RegistrarUsuario(registro).subscribe({
      next: (respuesta) => {
        if (respuesta.isSuccess) {
          this.registroExitoso.emit();
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "OK 😊");
        } else {
          this._servicioUtilidad.MostarAlerta(`${respuesta.mensaje}`, "ERROR 😢");
        }
      },
      error:(respuesta) => {
        console.log(respuesta.message);
      },
      complete: () => {
        this.screenLoadingChange.emit(false);
      }
    });
  }

  // Manejar el Login con Redes Sociales
  onSocialLogin(provider: string) {
    console.log(`Login desde SignUp con ${provider}`);
    this.socialLogin.emit(provider);
    // implementar lógica para procesar el Login con redes sociales
  }

}