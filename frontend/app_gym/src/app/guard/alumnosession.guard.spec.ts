import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { alumnosessionGuard } from './alumnosession.guard';

describe('alumnosessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => alumnosessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
