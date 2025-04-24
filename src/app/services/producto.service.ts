import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { listarProductos } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = environment.Url + "categorias";

  constructor(private http: HttpClient) { }

  lista(): Observable<listarProductos> {
    return this.http.get<listarProductos>(`${this.url}/`)
  }
}
