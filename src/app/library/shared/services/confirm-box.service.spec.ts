import { TestBed, inject } from '@angular/core/testing';

import { ConfirmBoxService } from './confirm-box.service';

describe('ConfirmBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmBoxService]
    });
  });

  it('should be created', inject([ConfirmBoxService], (service: ConfirmBoxService) => {
    expect(service).toBeTruthy();
  }));
});
