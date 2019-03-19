import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListBoxComponent } from './message-list-box.component';

describe('MessageListBoxComponent', () => {
  let component: MessageListBoxComponent;
  let fixture: ComponentFixture<MessageListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
