import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomvalidatorsComponent } from './customvalidators.component';

describe('CustomvalidatorsComponent', () => {
  let component: CustomvalidatorsComponent;
  let fixture: ComponentFixture<CustomvalidatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomvalidatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomvalidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
