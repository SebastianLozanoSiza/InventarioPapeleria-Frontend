import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { crearEntrada, listarEntradas } from '../interfaces/entrada';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private url: string = environment.Url + "entradas";

  constructor(private http: HttpClient) { }

  lista(): Observable<listarEntradas> {
    return this.http.get<listarEntradas>(`${this.url}/`)
  }

  guardar(request: crearEntrada):Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.url}/`, request)
  }

  editar(id: number, request: crearEntrada):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${this.url}/${id}`, request)
  }

  eliminar(id: number):Observable<Respuesta>{
    return this.http.delete<Respuesta>(`${this.url}/${id}`)
  }
}
