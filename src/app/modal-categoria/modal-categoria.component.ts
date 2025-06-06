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

  id = 0;
  nombre = '';
  categoriaPadreId: number | null = 0;
  error = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    if (this.categoria) {
      this.id = this.categoria.id;
      this.nombre = this.categoria.nombre || '';
      this.categoriaPadreId = this.categoria.categoria_padre_id;
    }
  }

  guardar() {
  const categoria = {
    id: this.id,
    nombre: this.nombre,
    categoria_padre_id: this.categoriaPadreId ? this.categoriaPadreId : null
  };
  this.categoriaService.crearCategoria(categoria).subscribe({
    next: () => {
      this.error = '';
      this.close.emit();
    },
    error: (err) => {
      this.error = err.error?.error || 'Error al crear la categoría';
    }
  });
}
}