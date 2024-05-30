import { TestBed } from '@angular/core/testing';

import { BuscarProfesorService } from './buscar-profesor.service';

describe('BuscarProfesorService', () => {
  let service: BuscarProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
