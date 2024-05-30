import { TestBed } from '@angular/core/testing';

import { AbmRutinaService } from './abm-rutina.service';

describe('AbmRutinaService', () => {
  let service: AbmRutinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbmRutinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
