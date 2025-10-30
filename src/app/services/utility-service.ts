import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar:MatSnackBar) { }

  MostarAlerta(mensaje:string, tipo:string, posHorizontal?: "center"){
    this._snackBar.open(mensaje, tipo, {
      duration: 8000,
      verticalPosition:"top",
      horizontalPosition: posHorizontal ?? "right"
    })
  }

}