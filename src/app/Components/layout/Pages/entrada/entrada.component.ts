import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { detalleEntradas, entradas } from 'src/app/interfaces/entrada';
import { EntradaService } from 'src/app/services/entrada.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalEntradaComponent } from '../../Modales/modal-entrada/modal-entrada.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  listaEntradas: entradas[] = []

  constructor(private dialog: MatDialog, private entradaService: EntradaService, private utilidadService: UtilidadService) {
    
  }

  ngOnInit(): void {
    this.obtenerEntradas();
  }

  obtenerEntradas(){
    this.entradaService.lista().subscribe({
      next: (value) => {
          if (!value.repuesta.error) {
            this.listaEntradas = value.entradas;
          }else{
            alert(value.repuesta.descripcion)
          }
      },
    })
  }

  nuevaEntrada(){
    this.dialog.open(ModalEntradaComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerEntradas();
      }
    });
  }

  editarEntrada(entrada: entradas){
    this.dialog.open(ModalEntradaComponent, {
      disableClose: true,
      data: entrada
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true"){
        this.obtenerEntradas()
      }
    });
  }

  eliminarEntrada(entrada: entradas, detalleEntrada: detalleEntradas){
    Swal.fire({
      title: '¿Desea eliminar el ingreso del producto?',
      text: detalleEntrada.producto,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) =>{
      if (resultado.isConfirmed) {
        this.entradaService.eliminar(entrada.id).subscribe({
          next:(value) => {
              if (!value.error) {
                this.utilidadService.mostrarAlerta(value.descripcion, "Eliminado");
                this.obtenerEntradas();
              }else{
                this.utilidadService.mostrarAlerta(value.descripcion, "Error");
              }
          },
          error: (e) => {}
        })
      }
    })
  }
}
