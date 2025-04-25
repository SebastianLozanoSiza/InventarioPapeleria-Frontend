import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { crearProductos, listarProductos } from '../interfaces/producto';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = environment.Url + "productos";

  constructor(private http: HttpClient) { }

  lista(): Observable<listarProductos> {
    return this.http.get<listarProductos>(`${this.url}/`)
  }

  guardar(request: crearProductos): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.url}/`, request)
  }

  editar(id: number, request: crearProductos): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${this.url}/${id}`, request)
  }

  eliminar(id: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${this.url}/${id}`)
  }
}
