import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {
  
  constructor(private snackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo:string){
    this.snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }
}
