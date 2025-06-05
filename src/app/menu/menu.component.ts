import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuSectionComponent } from '../menu-section/menu-section.component';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuSectionComponent, ModalProductoComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username = '';
  tipoSeleccionado: 'productos' | 'categorias' | 'proveedores' = 'productos';
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

  seleccionar(tipo: 'productos' | 'categorias' | 'proveedores') {
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