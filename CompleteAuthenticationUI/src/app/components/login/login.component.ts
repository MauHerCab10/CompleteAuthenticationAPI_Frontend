import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import PasswordToggler from "../../helpers/password.toggler";
import { AccesoService } from "../../services/acceso.service";
import { Login } from "../../interfaces/Login";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visualizacion: string = "password";
  esTexto: boolean = false;
  eyeIcon: string = "fa-eye";
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private servicioAcceso: AccesoService, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
  }

  TogglePassword() {
    PasswordToggler.HideShow_Password();

    // Sincronizar las propiedades del componente actual con las estáticas
    this.visualizacion = PasswordToggler.visualizacion;
    this.esTexto = PasswordToggler.esTexto;
    this.eyeIcon = PasswordToggler.eyeIcon;
  }

  onSubmit_FormLogin() {
    if (this.formLogin.valid) {
      // console.log(this.formLogin.value);
      
      let login:Login = {
        nombreUsuario: this.formLogin.value.nombreUsuario,
        contrasena: this.formLogin.value.contrasena,
      }

      this.servicioAcceso.AutenticarUsuario(login).subscribe({
        next: (respuesta) => {
          if (respuesta.isSuccess) {
            localStorage.setItem("idUsuario", respuesta.idUsuario.toString());
            localStorage.setItem("token", respuesta.token);
            this.router.navigate(['inicio']);
          } else {
            alert(`Las credenciales de acceso son incorrectas. \n${respuesta.mensaje}`);
          }
        },
        error:(respuesta) => {
          console.log(respuesta.mensaje);
        }
      });
    } else {
      console.log("Formulario no válido.");
    }
  }
  
}
