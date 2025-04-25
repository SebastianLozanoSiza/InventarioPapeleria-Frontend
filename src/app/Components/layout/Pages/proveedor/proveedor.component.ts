import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalProveedorComponent } from '../../Modales/modal-proveedor/modal-proveedor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  listaProveedores: proveedor[] = [];

  constructor(private dialog: MatDialog, private proveedorService: ProveedorService, private utilidadService: UtilidadService) {

  }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedorService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaProveedores = value.proveedor;
        } else {
          alert(value.respuesta.descripcion)
        }
      },
    })
  }

  nuevoProveedor() {
    this.dialog.open(ModalProveedorComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") {
        this.obtenerProveedores();
      }
    });
  }

  editarProveedor(proveedor: proveedor) {
    this.dialog.open(ModalProveedorComponent, {
      disableClose: true,
      data: proveedor
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerProveedores();
      }
    })
  }

  eliminarProveedor(proveedor: proveedor) {
    Swal.fire({
      title: '¿Desea eliminar el proveedor?',
      text: proveedor.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.proveedorService.eliminar(proveedor.idProveedor).subscribe({
          next: (value) => {
            if (!value.error) {
              this.utilidadService.mostrarAlerta(value.descripcion, "Eliminado");
              this.obtenerProveedores();
            } else {
              this.utilidadService.mostrarAlerta(value.descripcion, "Error");
            }
          },
          error: (e) => {

          }
        });
      }
    })
  }
}
