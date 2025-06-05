import { TestBed } from '@angular/core/testing';

import { ProductosUsuariosService } from './productos-usuarios.service';

describe('ProductosUsuariosService', () => {
  let service: ProductosUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
