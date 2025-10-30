import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
  private router = inject(Router);

  RegresarAInicio(){
    this.router.navigate(['inicio']);
  }
}
