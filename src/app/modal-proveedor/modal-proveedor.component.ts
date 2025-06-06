import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../services/proveedores.service';
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

  cif = '';
  nombre = '';
  error = '';

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit() {
    if (this.proveedor) {
      this.cif = this.proveedor.cif || '';
      this.nombre = this.proveedor.nombre || '';
    }
  }

  guardar() {
    const proveedor = {
      cif: this.cif,
      nombre: this.nombre
    };
    this.proveedorService.crearProveedor(proveedor).subscribe({
      next: () => {
        this.error = '';
        this.close.emit();
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al crear el proveedor';
      }
    });
  }
}