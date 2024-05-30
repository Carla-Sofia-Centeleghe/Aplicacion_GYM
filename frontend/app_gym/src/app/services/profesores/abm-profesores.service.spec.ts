import { TestBed } from '@angular/core/testing';

import { AbmProfesoresService } from './abm-profesores.service';

describe('AbmProfesoresService', () => {
  let service: AbmProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbmProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
