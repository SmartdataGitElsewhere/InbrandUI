import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLightBoxComponent } from './product-light-box.component';

describe('ProductLightBoxComponent', () => {
  let component: ProductLightBoxComponent;
  let fixture: ComponentFixture<ProductLightBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLightBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
