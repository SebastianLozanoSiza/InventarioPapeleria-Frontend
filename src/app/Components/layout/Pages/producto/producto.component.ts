import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { productos } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2';
import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  listaProductos: productos[] = [];

  constructor(private dialog: MatDialog, private productoService: ProductoService, private utilidadServicio: UtilidadService) {

  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaProductos = value.productos;
        } else {
          alert(value.respuesta.descripcion)
        }
      },
    })
  }

  nuevoProducto() {
    this.dialog.open(ModalProductoComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerProductos();
      }
    });
  }

  editarProducto(producto: productos) {
    this.dialog.open(ModalProductoComponent, {
      disableClose: true,
      data: producto
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerProductos();
      }
    });
  }

  eliminarProducto(producto: productos) {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.productoService.eliminar(producto.id).subscribe({
          next: (data) => {
            if (!data.error) {
              this.utilidadServicio.mostrarAlerta(data.descripcion, "Eliminado");
              this.obtenerProductos();
            } else {
              this.utilidadServicio.mostrarAlerta(data.descripcion, "Error");
            }
          },
          error: (e) => { }
        });
      }
    })
  }
}
