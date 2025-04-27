import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service'; // Ajusta el path si es necesario

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  error: string = '';
  registerError: string = '';
  isLoading: boolean = false;
  mostrarContrasena: boolean = false;
  modoRegistro: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleModoRegistro(): void {
    this.modoRegistro = !this.modoRegistro;
    this.error = '';
    this.registerError = '';
  }

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;
    const { email, contrasena } = this.loginForm.value;
    this.error = '';
    this.isLoading = true;

    try {
      await this.authService.login(email, contrasena);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = this.firebaseErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async onRegister() {
    if (this.registerForm.invalid) return;
    const { email, contrasena } = this.registerForm.value;
    this.registerError = '';
    this.isLoading = true;

    try {
      await this.authService.register(email, contrasena);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.registerError = this.firebaseErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async loginConGoogle() {
    this.error = '';
    this.isLoading = true;

    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = this.firebaseErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  firebaseErrorMessage(code: string): string {
    const errores: Record<string, string> = {
      'auth/email-already-in-use': 'El correo ya está registrado.',
      'auth/user-not-found': 'Usuario no encontrado.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-email': 'Correo electrónico inválido.',
      'auth/popup-closed-by-user': 'Popup de Google cancelado.',
      'auth/popup-blocked': 'El navegador bloqueó el inicio de sesión con Google.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    };
    return errores[code] || 'Ocurrió un error inesperado.';
  }
}
