import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-modal-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css'],
  providers: [CategoriaService]
})
export class ModalCategoriaComponent implements OnInit {
  @Input() categoria: any = {};
  @Input() modoCrear: boolean = false;
  @Output() close = new EventEmitter<void>();

  nombre = '';
  error = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    if (this.categoria) {
      this.nombre = this.categoria.nombre || '';
    }
  }

  guardar() {
    if (!this.nombre) {
      this.error = 'Nombre requerido';
      return;
    }
    const categoria = { nombre: this.nombre };
    if (this.modoCrear) {
      this.categoriaService.crearCategoria(categoria).subscribe({
        next: () => {
          this.error = '';
          this.close.emit();
        },
        error: () => {
          this.error = 'Error al crear categoría';
        }
      });
    } else {
      // Aquí podrías implementar la edición si tienes endpoint
      this.close.emit();
    }
  }
}