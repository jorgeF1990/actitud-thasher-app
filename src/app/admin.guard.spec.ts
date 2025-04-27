import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminGuard } from './admin.guard';

describe('adminGuard', () => {
  let executeGuard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard],
    });
    executeGuard = TestBed.inject(AdminGuard).canActivate.bind(TestBed.inject(AdminGuard));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
