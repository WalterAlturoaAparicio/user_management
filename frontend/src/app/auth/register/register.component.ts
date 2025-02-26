import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.matchPasswords } as AbstractControlOptions
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;
      this.authService.register(email, password, confirmPassword).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Redirecting...';
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Registration failed';
        },
      });
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
    }
  }

  passwordStrengthValidator(control: any) {
    const value = control.value;
    if (!value) return null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);

    return hasUpperCase && hasLowerCase && hasNumeric
      ? null
      : { passwordStrength: true };
  }

  matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
