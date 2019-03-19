import { TestBed, inject } from '@angular/core/testing';

import { SvInterceptorService } from './interceptor.service';

describe('SvInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvInterceptorService]
    });
  });

  it('should be created', inject([SvInterceptorService], (service: SvInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
