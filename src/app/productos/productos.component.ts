import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
eliminar(arg0: any) {
throw new Error('Method not implemented.');
}
abrirModalCrear() {
throw new Error('Method not implemented.');
}
  productos: any[] = [];
  filtro: string = '';
  filtroTipo: string = 'nombre';

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos() {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  buscar() {
    if (!this.filtro) {
      this.cargarTodos();
      return;
    }
    if (this.filtroTipo === 'nombre') {
      this.productoService.buscarPorNombre(this.filtro).subscribe(res => {
        this.productos = res;
      });
    } else if (this.filtroTipo === 'sku') {
      this.productoService.buscarPorSku(this.filtro).subscribe(res => {
        this.productos = res ? [res] : [];
      });
    }
  }
}