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

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:tipo', component: MenuSectionComponent },
  { path: 'usuario', component: MenuComponent, resolve: { usuario: UsuarioService } },
  { path: 'productos', component: MenuSectionComponent, data: { tipo: 'productos' }, resolve: { productos: ProductoService } },
  { path: 'categorias', component: MenuSectionComponent, data: { tipo: 'categorias' }, resolve: { categorias: CategoriaService } },
  { path: 'proveedores', component: MenuSectionComponent, data: { tipo: 'proveedores' }, resolve: { proveedores: ProveedorService } },
  { path: 'productos-usuarios', component: MenuSectionComponent, data: { tipo: 'productos-usuarios' }, resolve: { productosUsuarios: ProductosUsuariosService } },
  { path: 'productos-categoria', component: MenuSectionComponent, data: { tipo: 'productos-categoria' }, resolve: { productosCategoria: ProductosCategoriaService } },
  { path: 'productos-proveedores', component: MenuSectionComponent, data: { tipo: 'productos-proveedores' }, resolve: { productosProveedores: ProductosProveedoresService } },
  { path: '**', redirectTo: '' } // Redirige a home si la ruta no existe
];