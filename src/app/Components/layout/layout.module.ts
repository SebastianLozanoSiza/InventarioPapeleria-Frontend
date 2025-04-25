import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { CategoriaComponent } from './Pages/categoria/categoria.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { EntradaComponent } from './Pages/entrada/entrada.component';
import { SalidaComponent } from './Pages/salida/salida.component';
import { ProveedorComponent } from './Pages/proveedor/proveedor.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { ModalCategoriaComponent } from './Modales/modal-categoria/modal-categoria.component';
import { ModalProductoComponent } from './Modales/modal-producto/modal-producto.component';


@NgModule({
  declarations: [
    CategoriaComponent,
    ProductoComponent,
    EntradaComponent,
    SalidaComponent,
    ProveedorComponent,
    ModalCategoriaComponent,
    ModalProductoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
