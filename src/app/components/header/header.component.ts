import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service'; // Ajusta el path si es necesario

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;

  isLoggedIn: boolean = false;
  userName: string = 'Usuario';
  userRole: string = 'Admin';
  isAdmin: boolean = this.userRole === 'Admin';
  isUser: boolean = this.userRole === 'User';
  role: string = 'admin'; // Cambia esto según el rol del usuario

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    this.userName = this.isLoggedIn ? 'Usuario' : '';
    this.userRole = this.isLoggedIn ? 'Admin' : '';
    this.isAdmin = this.userRole === 'Admin';
    this.isUser = this.userRole === 'User';
  }
}
