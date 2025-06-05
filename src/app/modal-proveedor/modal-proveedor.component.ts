import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProveedorService } from '../services/proveedores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-proveedor.component.html',
  styleUrls: ['./modal-proveedor.component.css'],
  providers: [ProveedorService]
})
export class ModalProveedorComponent implements OnInit {
  @Input() proveedor: any = {};
  @Input() modoCrear: boolean = false;
  @Output() close = new EventEmitter<void>();

  nombre = '';
  email = '';
  error = '';

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit() {
    if (this.proveedor) {
      this.nombre = this.proveedor.nombre || '';
      this.email = this.proveedor.email || '';
    }
  }

  guardar() {
    if (!this.nombre || !this.email) {
      this.error = 'Todos los campos son requeridos';
      return;
    }
    const proveedor = { nombre: this.nombre, email: this.email };
    if (this.modoCrear) {
      this.proveedorService.crearProveedor(proveedor).subscribe({
        next: () => {
          this.error = '';
          this.close.emit();
        },
        error: () => {
          this.error = 'Error al crear proveedor';
        }
      });
    } else {
      // Aquí podrías implementar la edición si tienes endpoint
      this.close.emit();
    }
  }
}