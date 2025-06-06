import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosProveedoresService } from '../services/productos-proveedores.service';

@Component({
  selector: 'app-modal-productos-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-productos-proveedores.component.html',
  styleUrls: ['./modal-productos-proveedores.component.css'],
  providers: [ProductosProveedoresService]
})
export class ModalProductosProveedoresComponent implements OnInit {
  @Input() productosProveedores: any = {};
  @Input() modoCrear: boolean = false;
  @Output() close = new EventEmitter<void>();

  productoSku = '';
  proveedorCif = '';
  precioCompra: number | null = null;
  error = '';

  constructor(private productosProveedoresService: ProductosProveedoresService) {}

  ngOnInit() {
    if (this.productosProveedores) {
      this.productoSku = this.productosProveedores.producto_sku || '';
      this.proveedorCif = this.productosProveedores.proveedor_cif || '';
      this.precioCompra = this.productosProveedores.precio_compra ?? null;
    }
  }

  guardar() {
    const data = {
      producto_sku: this.productoSku,
      proveedor_cif: this.proveedorCif,
      precio_compra: this.precioCompra
    };
    this.productosProveedoresService.crear(data).subscribe({
      next: () => {
        this.error = '';
        this.close.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al guardar la relación';
      }
    });
  }
}