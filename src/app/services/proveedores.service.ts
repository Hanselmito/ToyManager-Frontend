import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private baseUrl = 'http://localhost:8080/api/proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos`);
  }

  buscarPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/buscar?nombre=${nombre}`);
  }

  crearProveedor(proveedor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, proveedor);
  }

  actualizarProveedor(cif: string, proveedor: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar/${cif}`, proveedor);
  }

  eliminarProveedor(cif: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${cif}`);
  }
}