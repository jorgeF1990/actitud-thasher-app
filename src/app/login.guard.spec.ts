import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('LoginGuard', () => {
  let authServiceMock: any;
  let routerMock: any;
  let guard: LoginGuard;

  beforeEach(() => {
    // Crear un mock del servicio de autenticación
    authServiceMock = {
      isAuthenticated$: jasmine.createSpy('isAuthenticated$').and.returnValue(of(false))
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access to login if not authenticated', () => {
    authServiceMock.isAuthenticated$.and.returnValue(of(false)); // Usuario no autenticado
    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue(); // Permite el acceso
    });
  });

  it('should redirect to home if authenticated', () => {
    authServiceMock.isAuthenticated$.and.returnValue(of(true)); // Usuario autenticado
    guard.canActivate().subscribe(result => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      expect(result).toBeFalse(); // No permite el acceso
    });
  });
});
