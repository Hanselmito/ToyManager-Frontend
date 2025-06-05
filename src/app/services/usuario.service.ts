import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) {}

  login(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, usuario);
  }

  register(usuario: any, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('nif', usuario.nif);
    formData.append('nombre', usuario.nombre);
    formData.append('email', usuario.email);
    formData.append('contrasena', usuario.contrasena);
    formData.append('imagen', imagen);
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getById/${id}`);
  }
}