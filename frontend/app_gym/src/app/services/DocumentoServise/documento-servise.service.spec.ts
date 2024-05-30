import { TestBed } from '@angular/core/testing';

import { DocumentoServise  } from './documento-servise.service';

describe('DocumentoServise', () => {
  let service: DocumentoServise ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentoServise );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
