import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductosUsuariosService } from '../services/productos-usuarios.service';
import { ProductosCategoriaService } from '../services/productos-categoria.service';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css'],
  providers: [ProductoService, CategoriaService, ProductosUsuariosService, ProductosCategoriaService]
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
  categoriaId: number | null = null;
  categorias: any[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService  
  ) {}

  ngOnInit() {
  if (this.producto) {
    this.nombre = this.producto.nombre || '';
    this.sku = this.producto.sku || '';
    this.stock = this.producto.stock || 0;
    this.precioVenta = this.producto.precio_venta || 0; // <-- CAMBIA ESTO
    this.descripcion = this.producto.descripcion || '';
    this.descripcionCorta = this.producto.descripcion_corta || ''; // <-- CAMBIA ESTO
    this.categoriaId = this.producto.categoriaId || null;
  }
  this.categoriaService.getCategorias().subscribe(cats => this.categorias = cats);
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  error: string = '';

  guardar() {
    const producto: any = {
      sku: this.sku,
      nombre: this.nombre,
      descripcion: this.descripcion,
      descripcion_corta: this.descripcionCorta,
      precio_venta: this.precioVenta,
      stock: this.stock,
    };

    if(this.categoriaId){
      producto.categorias = [{ id: this.categoriaId }];
    }

    const usuarioNif = Number(localStorage.getItem('usuarioNif'));

    if (!this.imagen) {
      this.error = 'Selecciona una imagen';
      return;
    }

    this.productoService.crearProducto(producto, usuarioNif, this.imagen)
      .subscribe({
        next: () => {
          this.error = '';
          this.close.emit();
        },
        error: (err) => {
            this.error = err.error?.error || 'Error al crear el producto';
          }
      });
  }
}