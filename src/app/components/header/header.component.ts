import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = false;

  isLoggedIn: boolean = false;
  userName: string = '';
  userRole: string = '';
  private userSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSub = this.authService.getCurrentUser().subscribe((user: User | null) => {
      this.isLoggedIn = !!user;
      this.userName = user?.displayName || user?.email || '';
      this.userRole = this.authService.isAdmin() ? 'Admin' : 'User';
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isUser(): boolean {
    return this.userRole === 'User';
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
