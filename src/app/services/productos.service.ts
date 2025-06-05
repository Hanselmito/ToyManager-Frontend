import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private baseUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conStock`);
  }

  buscarPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar?nombre=${nombre}`);
  }

  buscarPorSku(sku: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${sku}`);
  }

  crearProducto(producto: any, imagen: File, usuarioNif: number): Observable<any> {
    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    formData.append('imagen', imagen);
    formData.append('usuarioNif', usuarioNif.toString());
    return this.http.post(`${this.baseUrl}/crear`, formData);
  }

  actualizarProducto(sku: string, producto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar/${sku}`, producto);
  }

  eliminarProducto(sku: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${sku}`);
  }
}