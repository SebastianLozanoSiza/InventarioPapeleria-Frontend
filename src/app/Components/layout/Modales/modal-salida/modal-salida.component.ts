import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { productos } from 'src/app/interfaces/producto';
import { crearSalida, salidas } from 'src/app/interfaces/salida';
import { ProductoService } from 'src/app/services/producto.service';
import { SalidaService } from 'src/app/services/salida.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-salida',
  templateUrl: './modal-salida.component.html',
  styleUrls: ['./modal-salida.component.css']
})
export class ModalSalidaComponent implements OnInit {

  formularioSalida: FormGroup;
  tituloAccion: string = "Registrar";
  botonAccion: string = "Guardar";
  listaProductos: productos[] = [];

  constructor(private modalActual: MatDialogRef<ModalSalidaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosSalida: salidas,
    private fb: FormBuilder,
    private salidaService: SalidaService,
    private productoService: ProductoService,
    private utilidadService: UtilidadService) {
    this.formularioSalida = this.fb.group({
      motivoSalida: ['', Validators.required],
      detalleSalida: this.fb.array([this.crearDetalle()])
    });
    if (this.datosSalida != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = 'Actualizar';
      this.formularioSalida.patchValue({
        motivoSalida: this.datosSalida.motivo
      });
      const detallesFormArray = this.formularioSalida.get('detalleSalida') as FormArray;
      detallesFormArray.clear();

      this.datosSalida.detalleSalida.forEach(det => {
        detallesFormArray.push(this.fb.group({
          cantidad: [det.cantidad, Validators.required],
          precioUnitario: [det.precioUnitario, Validators.required],
          idProducto: [det.idProducto, Validators.required]
        }));
      });
    }
  }

  crearDetalle(): FormGroup {
    return this.fb.group({
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      idProducto: ['', Validators.required]
    });
  }

  get detallesFormArray(): FormArray {
    return this.formularioSalida.get('detalleSalida') as FormArray;
  }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaProductos = value.productos;
        } else {
          this.utilidadService.mostrarAlerta(value.respuesta.descripcion, "Error")
        }
      },
    })
  }

  guardarEditar_Salida() {
    const salida: crearSalida = {
      motivoSalida: this.formularioSalida.value.motivoSalida,
      detalleSalida: this.formularioSalida.value.detalleSalida.map((detalle: any) => ({
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
        idProducto: detalle.idProducto
      }))
    };
    if (this.datosSalida == null) {
      this.salidaService.guardar(salida).subscribe({
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
        }
      })
    } else {
      this.salidaService.editar(this.datosSalida.id, salida).subscribe({
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
        }
      })
    }
  }

}
