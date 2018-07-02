import { TestBed, inject, async } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';

import { UIService } from './../shared/ui.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';

describe('TestService', () => {

  let afAuthMock: {
    auth: {
      createUserWithEmailAndPassword: jasmine.Spy,
      signInWithEmailAndPassword: jasmine.Spy,
      signOut: jasmine.Spy
    }
  };
  let uiMockService: UIService;
  let routerMock: Router;
  let authService: AuthService;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate').and.callThrough()
    } as any;

    afAuthMock = {
      auth: jasmine.createSpyObj('AngularFireAuth',
        ['createUserWithEmailAndPassword', 'signInWithEmailAndPassword', 'signOut'])
    };

    uiMockService = {
      loadingStateChanged: new Subject<boolean>(),
      showSnackbar: jasmine.createSpy('showSnackbar').and.callThrough()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: UIService, useValue: uiMockService },
        { provide: AngularFireAuth, useValue: afAuthMock }
      ]
    });
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


  it('should be called registerUser with Success case', () => {
    afAuthMock.auth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({ id: 'test' }));
    authService.registerUser({
      email: 'test@test.com',
      password: '123456'
    });
    afAuthMock.auth.createUserWithEmailAndPassword().then((result) => {
      expect(result.id).toBe('test');
    });
  });


  it('should be called registerUser with Error case', () => {
    afAuthMock.auth.createUserWithEmailAndPassword.and.returnValue(Promise.reject({ errorMessage: 'error' }));
    authService.registerUser({
      email: 'test@test.com',
      password: '123456'
    });
    afAuthMock.auth.createUserWithEmailAndPassword().then((error) => {
      expect(error.errorMessage).toBe('error');
    });
  });

  it('should be called login with Success case', () => {
    afAuthMock.auth.signInWithEmailAndPassword.and.returnValue(Promise.resolve({ id: 'test' }));
    authService.login({
      email: 'test@test.com',
      password: '123456'
    });
    afAuthMock.auth.signInWithEmailAndPassword().then((result) => {
      expect(result.id).toBe('test');
    });
  });


  it('should be called login with Error case', () => {
    afAuthMock.auth.signInWithEmailAndPassword.and.returnValue(Promise.reject({ errorMessage: 'error' }));
    authService.login({
      email: 'test@test.com',
      password: '123456'
    });
    afAuthMock.auth.signInWithEmailAndPassword().then((error) => {
      expect(error.errorMessage).toBe('error');
    });
  });

  it('should be called logout', () => {
    authService.logout();
    expect(afAuthMock.auth.signOut).toHaveBeenCalled();
  });

  it('should be called isAuth', () => {
    expect(authService.isAuth()).toBe(false);
  });

});
