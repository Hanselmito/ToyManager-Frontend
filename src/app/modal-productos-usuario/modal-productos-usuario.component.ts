import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosUsuariosService } from '../services/productos-usuarios.service';

@Component({
  selector: 'app-modal-productos-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-productos-usuario.component.html',
  styleUrls: ['./modal-productos-usuario.component.css'],
  providers: [ProductosUsuariosService]
})
export class ModalProductosUsuarioComponent implements OnInit {
  @Input() productoUsuario: any = {};
  @Input() modoCrear: boolean = false;
  @Output() close = new EventEmitter<void>();

  usuarioNif = '';
  productoSku = '';
  nombreProducto = '';
  descripcion = '';
  descripcionCorta = '';
  precioVenta = 0;
  stock = 0;
  imagen: File | null = null;
  error = '';

  constructor(private productosUsuariosService: ProductosUsuariosService) {}

  ngOnInit() {
    if (this.productoUsuario) {
      this.usuarioNif = this.productoUsuario.usuario_nif || '';
      this.productoSku = this.productoUsuario.producto_sku || '';
      this.nombreProducto = this.productoUsuario.nombre_producto || '';
      this.descripcion = this.productoUsuario.descripcion || '';
      this.descripcionCorta = this.productoUsuario.descripcion_Corta || '';
      this.precioVenta = this.productoUsuario.precio_venta || 0;
      this.stock = this.productoUsuario.stock || 0;
    }
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  guardar() {
    const data = {
      usuario_nif: this.usuarioNif,
      producto_sku: this.productoSku,
      nombre_producto: this.nombreProducto,
      descripcion: this.descripcion,
      descripcion_Corta: this.descripcionCorta,
      precio_venta: this.precioVenta,
      stock: this.stock
    };
    // Imagen puede requerir manejo especial en el backend
    this.productosUsuariosService.guardar(data).subscribe({
      next: () => {
        this.error = '';
        this.close.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al crear el registro';
      }
    });
  }
}