import { TestBed } from '@angular/core/testing';

import { AbmAdminService } from './abm-admin.service';

describe('AbmAdminService', () => {
  let service: AbmAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbmAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
