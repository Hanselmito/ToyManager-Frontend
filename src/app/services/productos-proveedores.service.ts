import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosProveedoresService {
  private baseUrl = 'http://localhost:8080/api/productos-proveedores';

  constructor(private http: HttpClient) {}

  // Crear relación producto-proveedor
  crear(productosProveedore: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, productosProveedore);
  }

  // Obtener relación específica por producto y proveedor
  obtenerPorId(productoSku: string, proveedorCif: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productoSku}/${proveedorCif}`);
  }

  // Actualizar relación producto-proveedor
  actualizar(productoSku: string, proveedorCif: string, productosProveedore: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${productoSku}/${proveedorCif}`, productosProveedore);
  }

  // Eliminar relación producto-proveedor
  eliminar(productoSku: string, proveedorCif: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productoSku}/${proveedorCif}`);
  }

  // Obtener todos los proveedores de un producto
  obtenerPorProductoSku(sku: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/producto/${sku}`);
  }

  // Obtener todos los productos de un proveedor
  obtenerPorProveedorCif(cif: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/proveedor/${cif}`);
  }

  getAllProductosProveedores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/todos`);
  }
}