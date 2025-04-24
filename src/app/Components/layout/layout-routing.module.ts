import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { CategoriaComponent } from './Pages/categoria/categoria.component';
import { EntradaComponent } from './Pages/entrada/entrada.component';
import { SalidaComponent } from './Pages/salida/salida.component';
import { ProveedorComponent } from './Pages/proveedor/proveedor.component';

const routes: Routes = [{
  path:'',
  component: LayoutComponent,
  children:[
    {path: 'proveedores', component: ProveedorComponent},
    {path: 'categorias', component: CategoriaComponent},
    {path: 'productos', component: ProductoComponent},
    {path: 'entradas', component: EntradaComponent},
    {path: 'salidas', component: SalidaComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
