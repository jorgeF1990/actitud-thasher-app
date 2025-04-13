import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Asegúrate de importar el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Verifica si el usuario está autenticado y es admin
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    } else {
      // Redirige a la página principal si no está autorizado
      this.router.navigate(['/']);
      return false;
    }
  }
}
