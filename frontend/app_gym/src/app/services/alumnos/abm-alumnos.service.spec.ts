import { TestBed } from '@angular/core/testing';

import { AbmAlumnosService } from './abm-alumnos.service';

describe('AbmAlumnosService', () => {
  let service: AbmAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbmAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
