import { TestBed } from '@angular/core/testing';

import { VerClasesService } from './ver-clases.service';

describe('VerClasesService', () => {
  let service: VerClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerClasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
