import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProveedorService } from '../services/proveedores.service';
import { UsuarioService } from '../services/usuario.service';
import { ProductosUsuariosService } from '../services/productos-usuarios.service';
import { ProductosProveedoresService } from '../services/productos-proveedores.service';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-section.component.html',
  styleUrls: ['./menu-section.component.css']
})
export class MenuSectionComponent implements OnInit, OnChanges {
  @Input() tipo: 'productos' | 'categorias' | 'proveedores' | 'usuarios' | 'productos-usuario' | 'productos-proveedores' = 'productos';
  @Output() productoDobleClick = new EventEmitter<any>();
  @Output() crearProducto = new EventEmitter<void>();
  busqueda = '';
  criterioBusqueda = 'nombre';
  items: any[] = [];
  productoHover: any = null;
  productoDetalle: any = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private usuarioService: UsuarioService,
    private productosUsuariosService: ProductosUsuariosService,
    private productosProveedoresService: ProductosProveedoresService
  ) {}

  mostrarDetalle(item: any) {
    this.productoDetalle = item;
  }
  
  ngOnInit() {
    this.cargarItems();
  }

  ngOnChanges() {
    this.cargarItems();
  }


  cargarItems() {
    if (this.tipo === 'productos') {
      this.productoService.getProductos().subscribe(data => this.items = data);
    } else if (this.tipo === 'categorias') {
      this.categoriaService.getCategorias().subscribe(data => this.items = data);
    } else if (this.tipo === 'proveedores') {
      this.proveedorService.getProveedores().subscribe(data => this.items = data);
    } else if (this.tipo === 'usuarios') {
      this.usuarioService.getAllUsers().subscribe(data => this.items = data);
    } else if (this.tipo === 'productos-usuario') {
      this.productosUsuariosService.getAllProductosUsuarios().subscribe(data => this.items = data);
    } else if (this.tipo === 'productos-proveedores') {
      this.productosProveedoresService.getAllProductosProveedores().subscribe(data => this.items = data);
    }
  }

  buscar() {
    if (this.tipo === 'productos') {
    if (this.criterioBusqueda === 'nombre') {
      this.productoService.buscarPorNombre(this.busqueda).subscribe(data => this.items = data);
    } else if (this.criterioBusqueda === 'sku') {
      this.productoService.buscarPorSku(this.busqueda).subscribe(data => {
        this.items = data ? [data] : [];
      });
    }
    } else if (this.tipo === 'categorias') {
      this.categoriaService.buscarPorNombre(this.busqueda).subscribe(data => this.items = data);
    } else if (this.tipo === 'proveedores') {
      this.proveedorService.buscarPorNombre(this.busqueda).subscribe(data => this.items = data);
    } else if (this.tipo === 'usuarios') {
      this.usuarioService.getUserByEmail(this.busqueda).subscribe(data => {
        this.items = data ? [data] : [];
      });
    } else if (this.tipo === 'productos-proveedores'){
      this.productosProveedoresService.obtenerPorProductoSku(this.busqueda).subscribe(data => this.items = data);
    }
  }

  eliminar(item: any) {
    if (this.tipo === 'productos') {
      this.productoService.eliminarProducto(item.sku).subscribe(() => this.cargarItems());
    } else if (this.tipo === 'categorias') {
      this.categoriaService.eliminarCategoria(item.id).subscribe(() => this.cargarItems());
    } else if (this.tipo === 'proveedores') {
      this.proveedorService.eliminarProveedor(item.cif).subscribe(() => this.cargarItems());
    } else if (this.tipo === 'usuarios') {
      this.usuarioService.eliminarUsuario(item.id).subscribe(() => this.cargarItems());
    } else if (this.tipo === 'productos-usuario') {
      this.productosUsuariosService.eliminar(item.usuario_nif, item.producto_sku).subscribe(() => this.cargarItems());
    } else if (this.tipo === 'productos-proveedores') {
      this.productosProveedoresService.eliminar(item.id.productoSku, item.id.proveedorCif).subscribe(() => this.cargarItems());
    }
  }
}