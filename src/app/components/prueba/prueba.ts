import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-prueba',
  imports: [ MatIconModule ],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
  private router = inject(Router);

  RegresarAInicio(){
    this.router.navigate(['inicio']);
  }
}
