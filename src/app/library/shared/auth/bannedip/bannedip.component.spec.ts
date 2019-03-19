import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedipComponent } from './bannedip.component';

describe('BannedipComponent', () => {
  let component: BannedipComponent;
  let fixture: ComponentFixture<BannedipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
