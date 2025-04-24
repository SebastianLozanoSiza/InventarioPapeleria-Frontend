import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria, CrearCategoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent {
  formularioCategoria: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(private modalActual: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCategoria: Categoria,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private utilidadService: UtilidadService
  ) {
    this.formularioCategoria = this.fb.group({
      nombre: ['', Validators.required]
    });
    if (this.datosCategoria != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
      this.formularioCategoria.patchValue({
        nombre: this.datosCategoria.nombre
      })
    }
  }

  guardarEditar_Categoria() {
    const categoria: CrearCategoria = {
      nombre: this.formularioCategoria.value.nombre
    }

    if (this.datosCategoria == null) {
      this.categoriaService.guardar(categoria).subscribe({
        next: (data) => {
          if (!data.error) {
            this.utilidadService.mostrarAlerta(data.descripcion, "Exito");
            this.modalActual.close("true");
          } else {
            this.utilidadService.mostrarAlerta(data.descripcion, "Error");
          }
        },
        error: (e) => {
          this.utilidadService.mostrarAlerta("No se pudo conectar con el servidor", "Error");
        }
      })
    } else {
      this.categoriaService.editar(this.datosCategoria.idCategoria, categoria).subscribe({
        next: (data) => {
          if (!data.error) {
            this.utilidadService.mostrarAlerta(data.descripcion, "Exito");
            this.modalActual.close("true");
          } else {
            this.utilidadService.mostrarAlerta(data.descripcion, "Error");
          }
        },
        error: (e) => {
          this.utilidadService.mostrarAlerta("No se pudo conectar con el servidor", "Error");
        }
      })
    }
  }
}
