import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  private authService = inject(AuthService);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(): void {
    if (this.signupForm.valid)
    {
      this.loading = true
      const { name, email, password} = this.signupForm.value;

      this.authService.register({name, email, password}).subscribe({
        next: () => {
          this.loading = false;
          localStorage.setItem('email', this.signupForm.value.email);
          this.router.navigate(['/auth/verify-otp'], {queryParams: {email} });
        },
        error: (err) => {
          this.errorMessage = err.message || 'Signup failed. Please try again.';
          this.loading = false;
        }
      });
    }

  }

}


