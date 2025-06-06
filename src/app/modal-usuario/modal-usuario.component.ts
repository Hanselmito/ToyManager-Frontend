import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css'],
  providers: [UsuarioService]
})
export class ModalUsuarioComponent implements OnInit {
  @Input() usuario: any = {};
  @Output() close = new EventEmitter<void>();

  nif = '';
  nombre = '';
  email = '';
  rol = '';
  imagen: File | null = null;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    if (this.usuario) {
      this.nif = this.usuario.nif || '';
      this.nombre = this.usuario.nombre || '';
      this.email = this.usuario.email || '';
      this.rol = this.usuario.rol || '';
    }
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  actualizar() {
    const usuario = {
      nif: this.nif,
      nombre: this.nombre,
      email: this.email,
      rol: this.rol,
    };
    this.usuarioService.actualizarUsuario(usuario, this.imagen).subscribe({
      next: () => {
        this.error = '';
        this.close.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al actualizar el usuario';
      }
    });
  }
}