import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { crearEntrada, entradas } from 'src/app/interfaces/entrada';
import { productos } from 'src/app/interfaces/producto';
import { proveedor } from 'src/app/interfaces/proveedor';
import { EntradaService } from 'src/app/services/entrada.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-entrada.component.html',
  styleUrls: ['./modal-entrada.component.css']
})
export class ModalEntradaComponent implements OnInit {

  formularioEntrada: FormGroup;
  tituloAccion: string = "Registrar";
  botonAccion: string = "Guardar";
  listaProveedores: proveedor[] = [];
  listaProductos: productos[] = [];

  constructor(private modalActual: MatDialogRef<ModalEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosEntrada: entradas,
    private fb: FormBuilder,
    private entradaService: EntradaService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private utilidadService: UtilidadService) {
    this.formularioEntrada = this.fb.group({
      idProveedor: ['', Validators.required],
      detalles: this.fb.array([this.crearDetalle()])
    });
    if (this.datosEntrada != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = 'Actualizar';
      this.formularioEntrada.patchValue({
        idProveedor: this.datosEntrada.idProveedor
      });
      const detallesFormArray = this.formularioEntrada.get('detalles') as FormArray;
      detallesFormArray.clear();

      this.datosEntrada.detalles.forEach(det => {
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
    return this.formularioEntrada.get('detalles') as FormArray;
  }


  ngOnInit(): void {
    this.listarProveedores();
    this.listarProductos();
  }

  listarProveedores() {
    this.proveedorService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaProveedores = value.proveedor;
        } else {
          this.utilidadService.mostrarAlerta(value.respuesta.descripcion, "Error")
        }
      },
    })
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

  guardarEditar_Entrada() {
    const entrada: crearEntrada = {
      idProveedor: this.formularioEntrada.value.idProveedor,
      detalles: this.formularioEntrada.value.detalles.map((detalle: any) => ({
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
        idProducto: detalle.idProducto
      }))
    };
    if (this.datosEntrada == null) {
      this.entradaService.guardar(entrada).subscribe({
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
    }else{
      this.entradaService.editar(this.datosEntrada.id, entrada).subscribe({
        next:(value)=> {
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
