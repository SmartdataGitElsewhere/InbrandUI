import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubscriptionComponent } from './add-edit-subscription.component';

describe('AddEditSubscriptionComponent', () => {
  let component: AddEditSubscriptionComponent;
  let fixture: ComponentFixture<AddEditSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
