import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuSectionComponent } from './menu-section/menu-section.component';
import { ProductoService } from './services/productos.service';
import { CategoriaService } from './services/categoria.service';
import { ProveedorService } from './services/proveedores.service';
import { UsuarioService } from './services/usuario.service';
import { ProductosUsuariosService } from './services/productos-usuarios.service';
import { ProductosCategoriaService } from './services/productos-categoria.service';
import { ProductosProveedoresService } from './services/productos-proveedores.service';
import { ProductosComponent } from './productos/productos.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';
import { ModalProveedorComponent } from './modal-proveedor/modal-proveedor.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ModalProductosUsuarioComponent } from './modal-productos-usuario/modal-productos-usuario.component';
import { ModalProductosProveedoresComponent } from './modal-productos-proveedores/modal-productos-proveedores.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:tipo', component: MenuSectionComponent },
  { path: 'productos', component: ProductosComponent, resolve: { productos: ProductoService } },
  { path: 'usuario', component: MenuComponent, resolve: { usuario: UsuarioService } },
  { path: 'productos', component: MenuSectionComponent, data: { tipo: 'productos' }, resolve: { productos: ProductoService } },
  { path: 'categorias', component: MenuSectionComponent, data: { tipo: 'categorias' }, resolve: { categorias: CategoriaService } },
  { path: 'proveedores', component: MenuSectionComponent, data: { tipo: 'proveedores' }, resolve: { proveedores: ProveedorService } },
  { path: 'productos-usuarios', component: MenuSectionComponent, data: { tipo: 'productos-usuarios' }, resolve: { productosUsuarios: ProductosUsuariosService } },
  { path: 'productos-categoria', component: MenuSectionComponent, data: { tipo: 'productos-categoria' }, resolve: { productosCategoria: ProductosCategoriaService } },
  { path: 'productos-proveedores', component: MenuSectionComponent, data: { tipo: 'productos-proveedores' }, resolve: { productosProveedores: ProductosProveedoresService } },
  { path: 'modal-producto', component: ModalProductoComponent },
  { path: 'modal-categoria', component: ModalCategoriaComponent },
  { path: 'modal-proveedor', component: ModalProveedorComponent },
  { path: 'modal-usuario', component: ModalUsuarioComponent },
  { path: 'modal-producto-usuario', component: ModalProductosUsuarioComponent },
  { path: 'modal-productos-proveedores', component: ModalProductosProveedoresComponent },
  { path: '**', redirectTo: '' } // Redirige a home si la ruta no existe
];