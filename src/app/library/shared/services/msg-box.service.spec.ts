import { TestBed, inject } from '@angular/core/testing';

import { MsgBoxService } from './msg-box.service';

describe('MsgBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgBoxService]
    });
  });

  it('should be created', inject([MsgBoxService], (service: MsgBoxService) => {
    expect(service).toBeTruthy();
  }));
});
