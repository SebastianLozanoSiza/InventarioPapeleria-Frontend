import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';

const routes: Routes = [
  {path:'', component: LayoutComponent, pathMatch: "full"},
  {path:'pages', loadChildren: () => import("./Components/layout/layout.module").then(m => m.LayoutModule)},
  {path:'**', component: LayoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
