import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  email = '';
  otpCode = '';

  ngOnInit() {
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      this.router.navigate(['/auth/signup']);
    }
    this.email = storedEmail!;
  }

  verifyOtp() {
    if (this.otpCode.length !== 6) {
      this.errorMessage = 'Please enter a valid 6-digit code.';
      return;
    }

    this.isLoading = true;
    this.authService.verifyOtp({ email: this.email, code: this.otpCode }).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.router.navigate(['/auth/confirmation']);
        } else {
          this.errorMessage = 'Invalid OTP code. Please try again.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Verification failed. Please try again later.';
        this.isLoading = false;
      }
    });
  }

}
