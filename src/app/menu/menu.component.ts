import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  openMenu: string | null = null;
  currentView: string = '';
  username: string = '';

  productos = [
    { nombre: 'Producto 1' },
    { nombre: 'Producto 2' },
    { nombre: 'Producto 3' }
  ];

  ngOnInit() {
    // Ejemplo: obtener el usuario del localStorage
    const user = localStorage.getItem('user');
    this.username = user ? JSON.parse(user).nombre || JSON.parse(user).email : 'Usuario';
  }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  setView(view: string) {
    this.currentView = view;
  }

  buscarProductos(valor: string) {
    // Aquí iría la lógica para buscar productos por nombre o SKU usando tu API
    // Por ahora es solo un filtro local de ejemplo
    this.productos = [
      { nombre: 'Producto 1' },
      { nombre: 'Producto 2' },
      { nombre: 'Producto 3' }
    ].filter(p => p.nombre.toLowerCase().includes(valor.toLowerCase()));
  }
}