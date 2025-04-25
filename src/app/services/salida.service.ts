import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { crearSalida, listarSalidas } from '../interfaces/salida';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  private url: string = environment.Url + "salidas";

  constructor(private http: HttpClient) { }

  lista(): Observable<listarSalidas> {
    return this.http.get<listarSalidas>(`${this.url}/`)
  }

  guardar(request: crearSalida):Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.url}/`, request)
  }

  editar(id: number, request: crearSalida):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${this.url}/${id}`, request)
  }

  eliminar(id: number):Observable<Respuesta>{
    return this.http.delete<Respuesta>(`${this.url}/${id}`)
  }
}
