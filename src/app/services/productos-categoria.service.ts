import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosCategoriaService {
  private baseUrl = 'http://localhost:8080/api/productos-categoria';

  constructor(private http: HttpClient) {}

  // Guarda una nueva relación entre producto y categoría
  guardar(productosCategoria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/guardar`, productosCategoria);
  }

  // Obtiene productos por categoría
  obtenerPorCategoria(idCategoria: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categoria/${idCategoria}`);
  }

  // Obtiene categorías por producto
  obtenerPorProducto(skuProducto: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/producto/${skuProducto}`);
  }

  // Elimina una relación entre producto y categoría (por id de ProductosCategoria, debe ir en el body)
  eliminar(productosCategoria: any): Observable<Object> {
    return this.http.request('delete', `${this.baseUrl}/eliminar`, { body: productosCategoria });
  }
}