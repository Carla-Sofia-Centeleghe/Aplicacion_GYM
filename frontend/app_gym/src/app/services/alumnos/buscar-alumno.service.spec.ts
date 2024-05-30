import { TestBed } from '@angular/core/testing';

import { BuscarAlumnoService } from './buscar-alumno.service';

describe('BuscarAlumnoService', () => {
  let service: BuscarAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
