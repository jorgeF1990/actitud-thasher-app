import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;

  // Variables para manejar el estado de autenticación y roles
  isLoggedIn: boolean = false;
  userName: string = 'Usuario';
  userRole: string = 'Admin';  // Puedes cargar esto dinámicamente desde AuthService

  constructor(private authService: AuthService) {}

  // Toggle para abrir/cerrar el menú
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Toggle del estado de login
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    this.userName = this.isLoggedIn ? 'Usuario' : '';
    this.userRole = this.isLoggedIn ? 'Admin' : '';
  }

  // Métodos de verificación de roles
  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isUser(): boolean {
    return this.userRole === 'User';
  }
}
