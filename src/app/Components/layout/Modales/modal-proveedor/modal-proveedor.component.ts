import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { crearProveedor, proveedor } from 'src/app/interfaces/proveedor';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-proveedor',
  templateUrl: './modal-proveedor.component.html',
  styleUrls: ['./modal-proveedor.component.css']
})
export class ModalProveedorComponent {

  formularioProveedor: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(private modalActual: MatDialogRef<ModalProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProveedor: proveedor,
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private utilidadService: UtilidadService
  ) {
    this.formularioProveedor = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required]
    });
    if (this.datosProveedor != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
      this.formularioProveedor.patchValue({
        nombre: this.datosProveedor.nombre,
        correo: this.datosProveedor.correo,
        telefono: this.datosProveedor.telefono
      });
    }
  }

  guardarEditarProveedor() {
    const proveedor: crearProveedor = {
      nombre: this.formularioProveedor.value.nombre,
      correo: this.formularioProveedor.value.correo,
      telefono: this.formularioProveedor.value.telefono
    }
    if (this.datosProveedor == null) {
      this.proveedorService.guardar(proveedor).subscribe({
        next: (value) => {
          if (!value.error) {
            this.utilidadService.mostrarAlerta(value.descripcion, "Exito");
            this.modalActual.close("true");
          } else {
            this.utilidadService.mostrarAlerta(value.descripcion, "Error");
          }
        },
        error: (e) => {
          this.utilidadService.mostrarAlerta("No se pudo conectar con el servidor", "Error");
        },
      })
    } else {
      this.proveedorService.editar(this.datosProveedor.idProveedor, proveedor).subscribe({
        next: (value) => {
          if (!value.error) {
            this.utilidadService.mostrarAlerta(value.descripcion, "Exito");
            this.modalActual.close("true");
          }else{
            this.utilidadService.mostrarAlerta(value.descripcion, "Error");
          }
        },
        error:(e) => {
            this.utilidadService.mostrarAlerta("No se pudo conectar con el servidor", "Error");
        },
      })
    }
  }
}
