import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { salidas } from 'src/app/interfaces/salida';
import { SalidaService } from 'src/app/services/salida.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalSalidaComponent } from '../../Modales/modal-salida/modal-salida.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  listaSalidas: salidas[] = [];

  constructor(private dialog: MatDialog, private salidaService: SalidaService, private utilidadService: UtilidadService) {

  }

  ngOnInit(): void {
    this.obtenerSalidas();
  }

  obtenerSalidas() {
    this.salidaService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaSalidas = value.detalle;
        } else {
          alert(value.respuesta.descripcion)
        }
      },
    })
  }

  nuevaSalida() {
    this.dialog.open(ModalSalidaComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerSalidas();
      }
    });
  }

  editarSalida(salida: salidas) {
    this.dialog.open(ModalSalidaComponent, {
      disableClose: true,
      data: salida
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerSalidas()
      }
    });
  }

  eliminarSalida(salida: salidas) {
    Swal.fire({
      title: '¿Desea eliminar la salida del producto?',
      // text: detalleEntrada.producto,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.salidaService.eliminar(salida.id).subscribe({
          next: (value) => {
            if (!value.error) {
              this.utilidadService.mostrarAlerta(value.descripcion, "Eliminado");
              this.obtenerSalidas();
            } else {
              this.utilidadService.mostrarAlerta(value.descripcion, "Error");
            }
          },
          error: (e) => { }
        })
      }
    })
  }
}


