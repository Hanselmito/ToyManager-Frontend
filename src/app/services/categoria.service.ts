import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private baseUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todas`);
  }

  buscarPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar?nombre=${nombre}`);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, categoria);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}