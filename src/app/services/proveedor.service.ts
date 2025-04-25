import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { crearProveedor, listarProveedores } from '../interfaces/proveedor';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private url: string = environment.Url + "proveedores";

  constructor(private http: HttpClient) { }

  lista(): Observable<listarProveedores>{
    return this.http.get<listarProveedores>(`${this.url}/`)
  }

  guardar(objeto: crearProveedor): Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.url}/`, objeto)
  }

  editar(id: number, request: crearProveedor): Observable<Respuesta>{
    return this.http.put<Respuesta>(`${this.url}/${id}`, request)
  }

  eliminar(id: number): Observable<Respuesta>{
    return this.http.delete<Respuesta>(`${this.url}/${id}`)
  }
}
