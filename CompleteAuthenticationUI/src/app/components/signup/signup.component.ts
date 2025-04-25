// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router'; //modulo para poder habilitar los enlaces dentro del componente
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import PasswordToggler from '../../helpers/password.toggler';
// import { Registro } from '../../interfaces/Registro';
// import { AccessService } from '../../services/access.service';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [CommonModule, RouterModule, ReactiveFormsModule],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.css'
// })
// export class SignupComponent {
//   visualizacion: string = "password";
//   esTexto: boolean = false;
//   eyeIcon: string = "fa-eye";
//   formSignup!: FormGroup;

//     constructor(
//       private fb: FormBuilder, 
//       private access: AccessService, 
//       private router: Router
//     ){}

//   ngOnInit(): void {
//     this.formSignup = this.fb.group({
//       nombre: ['', Validators.required],
//       apellido: ['', Validators.required],
//       email: ['', Validators.required],
//       nombreUsuario: ['', Validators.required],
//       contrasena: ['', Validators.required]
//     })
//   }

//   TogglePassword() {
//     PasswordToggler.HideShow_Password();

//     // Sincronizar las propiedades del componente actual con las estáticas
//     this.visualizacion = PasswordToggler.visualizacion;
//     this.esTexto = PasswordToggler.esTexto;
//     this.eyeIcon = PasswordToggler.eyeIcon;
//   }

//   onSubmit_FormSignup() {
//     if (this.formSignup.valid) {
//       // console.log(this.formLogin.value);
      
//       let registro:Registro = {
//         nombreApellido: this.formSignup.value.nombreApellido,
//         nombreUsuario: this.formSignup.value.nombreUsuario,
//         contrasena: this.formSignup.value.contrasena
//       }

//       this.access.RegistrarUsuario(registro).subscribe({
//         next: (respuesta) => {
//           if (respuesta.isSuccess) {
//             this.router.navigate(['login']);
//           } else {
//             alert(`Error al intentar registrarse. \n${respuesta.mensaje}`);
//           }
//         },
//         error:(respuesta) => {
//           console.log(respuesta.mensaje);
//         }
//       });
//     } else {
//       console.log("Formulario no válido.");
//     }
//   }

// }
