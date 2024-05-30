import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminsessionGuard } from './adminsession.guard';

describe('adminsessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminsessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
