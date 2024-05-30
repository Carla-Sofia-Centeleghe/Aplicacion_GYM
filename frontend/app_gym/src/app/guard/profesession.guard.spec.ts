import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profesessionGuard } from './profesession.guard';

describe('profesessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profesessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
