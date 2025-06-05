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

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:tipo', component: MenuSectionComponent },
  { path: 'usuario', component: MenuComponent, resolve: { usuario: UsuarioService } },
  { path: 'productos', component: MenuSectionComponent, data: { tipo: 'productos' } },
  { path: 'categorias', component: MenuSectionComponent, data: { tipo: 'categorias' } },
  { path: 'proveedores', component: MenuSectionComponent, data: { tipo: 'proveedores' } },
  { path: 'productos/:sku', component: MenuSectionComponent, data: { tipo: 'productos' } },
  { path: 'categorias/:id', component: MenuSectionComponent, data: { tipo: 'categorias' } },
  { path: 'proveedores/:cif', component: MenuSectionComponent, data: { tipo: 'proveedores' } },
  { path: 'usuario/:email', component: MenuComponent, resolve: { usuario: UsuarioService } },
  { path: '**', redirectTo: '' } // Redirige a home si la ruta no existe
];