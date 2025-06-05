import { TestBed } from '@angular/core/testing';

import { ProductosCategoriaService } from './productos-categoria.service';

describe('ProductosCategoriaService', () => {
  let service: ProductosCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
