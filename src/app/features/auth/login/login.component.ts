import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  isError = false;
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(): void {
    this.isLoading = true;
    this.isError = false;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error.message || 'An error occurred while logging in. Please try again later.';
      }
    });
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.isError = false;

    this.authService.fakeGoogleLogin().subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error.message || 'An error occurred while logging in with Google. Please try again later.';
      }
    });
  }
}
