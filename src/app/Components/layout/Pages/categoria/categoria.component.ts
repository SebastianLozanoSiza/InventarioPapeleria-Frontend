import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalCategoriaComponent } from '../../Modales/modal-categoria/modal-categoria.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  listaCategoria: Categoria[] = [];

  constructor(private dialog: MatDialog, private categoriaService: CategoriaService, private utilidadService: UtilidadService) {

  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaCategoria = value.categoria;
        } else {
          alert(value.respuesta.descripcion)
        }
      },
    })
  }

  nuevaCategoria() {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerCategorias();
      }
    })
  }
  editarCategoria(categoria: Categoria) {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true,
      data: categoria
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerCategorias();
      }
    })
  }

  eliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: '¿Desea eliminar la categoria?',
      text: categoria.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.categoriaService.eliminar(categoria.idCategoria).subscribe({
          next: (data) => {
            if (!data.error) {
              this.utilidadService.mostrarAlerta(data.descripcion, "Eliminado");
              this.obtenerCategorias();
            } else {
              this.utilidadService.mostrarAlerta(data.descripcion, "Error");
            }
          },
          error: (e) => { }
        });
      }
    })
  }
}
