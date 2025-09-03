import {Routes} from "@angular/router";

export const authRoutes : Routes = [
  {path: 'auth/login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {path: 'auth/signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  {path: 'auth/verify-otp', loadComponent: () => import('./verify-otp/otp.component').then(m => m.OtpComponent) },
  {path: 'auth/confirmation', loadComponent: () => import('./confirmation/confirmation.component').then(m => m.ConfirmationComponent) },
];
