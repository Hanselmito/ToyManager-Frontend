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

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username') || '';
      
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