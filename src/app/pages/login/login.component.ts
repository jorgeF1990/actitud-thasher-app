import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Asegúrate de tener este archivo o elimínalo
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, contrasena } = this.loginForm.value;
    this.error = '';
    this.isLoading = true;

    try {
      await signInWithEmailAndPassword(this.auth, email, contrasena);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = this.firebaseErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async loginConGoogle() {
    this.error = '';
    this.isLoading = true;

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = this.firebaseErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  firebaseErrorMessage(code: string): string {
    const errores: Record<string, string> = {
      'auth/user-not-found': 'Usuario no encontrado.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-email': 'Correo electrónico inválido.',
      'auth/popup-closed-by-user': 'Popup de Google cancelado.',
      'auth/popup-blocked': 'El navegador bloqueó el inicio de sesión con Google.',
    };
    return errores[code] || 'Ocurrió un error inesperado.';
  }
}
