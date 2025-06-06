import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosUsuariosService {
  private baseUrl = 'http://localhost:8080/api/productos-usuarios';

  constructor(private http: HttpClient) {}

  // Guarda un nuevo producto asociado a un usuario
  guardar(productosUsuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/guardar`, productosUsuario);
  }

  // Obtiene todos los productos asociados a un usuario
  obtenerPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  // Obtiene un producto específico asociado a un usuario por su SKU
  obtenerPorUsuarioYSku(idUsuario: number, sku: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuario/${idUsuario}/producto/${sku}`);
  }

  // Elimina un producto asociado a un usuario usando nif y sku
  eliminar(usuarioNif: string, productoSku: string): Observable<Object> {
    const body = { usuarioNif, productoSku };
    return this.http.request('delete', `${this.baseUrl}/eliminar`, { body });
  }

  // Obtener todos los productos asociados a todos los usuarios
  getAllProductosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos`);
  }
}