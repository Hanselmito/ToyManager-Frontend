import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/productos.service';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit {
  @Input() producto: any = {};
  @Input() modoCrear: boolean = false;
  @Output() close = new EventEmitter<void>();

  nombre = '';
  sku = '';
  stock = 0;
  precioVenta = 0;
  descripcion = '';
  descripcionCorta = '';
  imagen: File | null = null;
  
  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    if (this.producto) {
      this.nombre = this.producto.nombre || '';
      this.sku = this.producto.sku || '';
      this.stock = this.producto.stock || 0;
      this.precioVenta = this.producto.precioVenta || 0;
      this.descripcion = this.producto.descripcion || '';
      this.descripcionCorta = this.producto.descripcionCorta || '';
    }
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  guardar() {
  const usuarioNif = Number(localStorage.getItem('usuarioNif') || 0);
  const prod = {
    sku: this.sku,
    nombre: this.nombre,
    descripcion: this.descripcion,
    descripcion_corta: this.descripcionCorta,
    precio_venta: this.precioVenta,
    stock: this.stock
  };
  if (this.modoCrear) {
    if (!this.imagen) {
      alert('Selecciona una imagen');
      return;
    }
    this.productoService.crearProducto(prod, this.imagen, usuarioNif)
      .subscribe(() => this.close.emit());
  } else {
    this.productoService.actualizarProducto(this.sku, prod)
      .subscribe(() => this.close.emit());
  }
}
}