import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticatedCompany } from './auth-service.guard';

describe('AuthenticatedCompany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatedCompany]
    });
  });

  it('should ...', inject([AuthenticatedCompany], (guard: AuthenticatedCompany) => {
    expect(guard).toBeTruthy();
  }));
});
