import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { MembershipService } from '../../../../core/services/membership-service/membership.service';
import { NotificationService } from '../../../../core/coreservice-index';
import { ApiService } from '../../../../../library/core/services/api-service/api.service';
import { ErrorHandlerService } from '../../../../../library/core/services/error-handler/error-handler.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule,HttpClientModule,ToastrModule],
      declarations: [ LoginComponent ],
      providers:[MembershipService, NotificationService,ApiService,CookieService,ErrorHandlerService,ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form - Username field validity', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    let Username = component.loginForm.controls['Username'];
    expect(Username.valid).toBeFalsy();
  }));

  it('form - should not be valid on init', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component.loginForm.valid).toBeFalsy();
  }));
  it('form - Username field validity', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    let Username = component.loginForm.controls['Username'];
    expect(Username.valid).toBeFalsy();
  }));
  it('Username field validity', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    let errors = {};
    let Username = component.loginForm.controls['Username'];
    errors = Username.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Username field pattern', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    let errors = {};
    let Username = component.loginForm.controls['Username'];
    Username.setValue("test");
    errors = Username.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Form submit', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['Username'].setValue("test@test.com");
    component.loginForm.controls['Password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();
  });
});
