import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CrearCategoria, listarCategoria } from '../interfaces/categoria';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = environment.Url + "categorias";

  constructor(private http: HttpClient) { }

  lista(): Observable<listarCategoria> {
    return this.http.get<listarCategoria>(`${this.url}/`)
  }

  guardar(objeto: CrearCategoria): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.url}/`, objeto)
  }

  editar(id: number, request: CrearCategoria): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${this.url}/${id}`, request)
  }

  eliminar(id: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${this.url}/${id}`)
  }
}
