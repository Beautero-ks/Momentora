import {inject, Injectable} from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {delay} from "rxjs/operators";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface OtpPayload {
  email: string;
  code: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private tokenKey = 'momentora-token';
  private fakeOtpCode = '123456';
  private currentUser: { name: string; email: string } | null = null;

  constructor() {
    const stored = localStorage.getItem('currentUser');
    if (stored) this.currentUser = JSON.parse(stored);
  }
  setCurrentUser(user: { name: string; email: string }): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): { name: string; email: string } | null {
    return this.currentUser;
  }

  login(email: string, password: string): Observable<void>{
    if (email  && password ) {
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      return of(void 0); // Simulate successful login
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  register(userRegister: RegisterPayload): Observable<{ success: boolean; }>{
    localStorage.setItem('otp_code', this.fakeOtpCode);
    return of({ success: true }).pipe(delay(1000));
  }

  verifyOtp(data: { email: string, code: string }): Observable<boolean> {
    const storedOtp = localStorage.getItem('otp_code');
    if (data.code === storedOtp) {
      // Simulation d'un compte activé
      const userData = localStorage.getItem('pending_user');
      if (userData) {
        localStorage.setItem('auth_user', userData);
        localStorage.setItem('auth_token', 'fake-token');
        // Nettoyer les données temporaires
        localStorage.removeItem('otp_code');
        localStorage.removeItem('pending_user');
      }
      return of(true);
    }
    return of(false);
  }

  fakeGoogleLogin(): Observable<void> {
    localStorage.setItem(this.tokenKey, 'fake-google-jwt-token');
    return of(void 0); // Simulate successful Google login
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
