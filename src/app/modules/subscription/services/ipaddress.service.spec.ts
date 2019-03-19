import { TestBed, inject } from '@angular/core/testing';

import { IpaddressService } from './ipaddress.service';

describe('IpaddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpaddressService]
    });
  });

  it('should be created', inject([IpaddressService], (service: IpaddressService) => {
    expect(service).toBeTruthy();
  }));
});
