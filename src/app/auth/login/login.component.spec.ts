import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LoginComponent } from './login.component';
import { SharedModule } from './../../shared/shared.module';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginEl: DebugElement;
  let authMockService: AuthService;
  let uiMockService: UIService;

  beforeEach(async(() => {
    authMockService = {
      login: jasmine.createSpy('login').and.callThrough()
    } as any;

    uiMockService = {
      loadingStateChanged: new Subject<boolean>(),
      showSnackbar: jasmine.createSpy('showSnackbar').and.callThrough()
    } as any;

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authMockService },
        { provide: UIService, useValue: uiMockService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign isLoading when subscription is completed', async(() => {
    uiMockService.loadingStateChanged.next(true);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.isLoading).toEqual(true);
    });
  }));

  it('should have form and "Your email" & "Your password field" field', () => {
    const elEmail: HTMLElement = loginEl.query(By.css('#email label')).nativeElement;
    const elPassword: HTMLElement = loginEl.query(By.css('#password label')).nativeElement;
    expect(elEmail.innerText).toContain('Your email');
    expect(elPassword.innerText).toContain('Your password');
  });

  it('should show loader if isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loaderEl: HTMLElement = loginEl.query(By.css('.mat-spinner')).nativeElement;
    expect(loaderEl).toBeDefined();
  });

  it('should submit login form on click of submit button', () => {
    component.loginForm = new FormGroup({
      email: new FormControl('hello@gmail.com', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('123456', {
        validators: [Validators.required]
      })
    });

    fixture.detectChanges();
    const submitEl: HTMLElement = loginEl.query(By.css('#submitBtn')).nativeElement;
    submitEl.click();
    expect(authMockService.login).toHaveBeenCalled();
  });
});
