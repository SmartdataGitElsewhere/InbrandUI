import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpaddresslistComponent } from './ipaddresslist.component';

describe('IpaddresslistComponent', () => {
  let component: IpaddresslistComponent;
  let fixture: ComponentFixture<IpaddresslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpaddresslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpaddresslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
