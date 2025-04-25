import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/interfaces/categoria';
import { crearProductos, productos } from 'src/app/interfaces/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit{

  formularioProducto: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = 'Guardar';
  listaCategorias: Categoria[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: productos,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private utilidadService: UtilidadService
  ) {
    this.formularioProducto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      stockActual: ['', Validators.required],
      stockMinimo: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      idCategoria: ['', Validators.required]
    });
    if (this.datosProducto != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = 'Actualizar';
      this.formularioProducto.patchValue({
        nombre: this.datosProducto.nombre,
        descripcion: this.datosProducto.descripcion,
        stockActual: this.datosProducto.stockActual,
        stockMinimo: this.datosProducto.stockMinimo,
        precioCompra: this.datosProducto.precioCompra,
        precioVenta: this.datosProducto.precioVenta,
        idCategoria: this.datosProducto.idCategoria
      });
    }
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.categoriaService.lista().subscribe({
      next: (value) => {
        if (!value.respuesta.error) {
          this.listaCategorias = value.categoria;
        } else {
          this.utilidadService.mostrarAlerta(value.respuesta.descripcion, "Error")
        }
      },
    })
  }

  guardarEditar_Producto() {
    const _producto: crearProductos = {
      nombre: this.formularioProducto.value.nombre,
      descripcion: this.formularioProducto.value.descripcion,
      stockActual: this.formularioProducto.value.stockActual,
      stockMinimo: this.formularioProducto.value.stockMinimo,
      precioCompra: this.formularioProducto.value.precioCompra,
      precioVenta: this.formularioProducto.value.precioVenta,
      idCategoria: this.formularioProducto.value.idCategoria
    }

    if (this.datosProducto == null) {
      this.productoService.guardar(_producto).subscribe({
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
      this.productoService.editar(this.datosProducto.id, _producto).subscribe({
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
