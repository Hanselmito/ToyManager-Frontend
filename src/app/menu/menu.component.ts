import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuSectionComponent } from '../menu-section/menu-section.component';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import { ModalCategoriaComponent } from '../modal-categoria/modal-categoria.component';
import { ModalProveedorComponent } from '../modal-proveedor/modal-proveedor.component';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { ModalProductosUsuarioComponent } from '../modal-productos-usuario/modal-productos-usuario.component';
import { ModalProductosProveedoresComponent } from '../modal-productos-proveedores/modal-productos-proveedores.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuSectionComponent, ModalProductoComponent, ModalCategoriaComponent,
    ModalProveedorComponent, ModalUsuarioComponent, ModalProductosUsuarioComponent, ModalProductosProveedoresComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username = '';
  tipoSeleccionado: 'productos' | 'categorias' | 'proveedores' | 'usuarios' | 'productos-usuario' | 'productos-proveedores' = 'productos';
  modalAbierto = false;
  productoEditar: any = null;
  modoCrear = false;
  usuarioEmail: any;
  esEmpleado: any;
  esAdmin: any;

  constructor(private router: Router) {}

  ngOnInit() {
  if (typeof window !== 'undefined' && window.localStorage) {
    this.username = localStorage.getItem('username') || '';
    this.usuarioEmail = localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')!).email : '';
    this.esEmpleado = this.usuarioEmail.endsWith('@empleado.com');
    this.esAdmin = this.usuarioEmail.endsWith('@admin.com');
  } else {
    this.username = '';
    this.usuarioEmail = '';
    this.esEmpleado = false;
    this.esAdmin = false;
  }
}

  seleccionar(tipo: 'productos' | 'categorias' | 'proveedores' | 'usuarios' | 'productos-usuario' | 'productos-proveedores') {
    this.tipoSeleccionado = tipo;
  }

  abrirModalEdicion(producto: any) {
    this.productoEditar = producto;
    this.modoCrear = false;
    this.modalAbierto = true;
  }

  abrirModalCrear() {
    this.productoEditar = null;
    this.modoCrear = true;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}