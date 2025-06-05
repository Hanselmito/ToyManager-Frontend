import { TestBed } from '@angular/core/testing';

import { ProductosProveedoresService } from './productos-proveedores.service';

describe('ProductosProveedoresService', () => {
  let service: ProductosProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
