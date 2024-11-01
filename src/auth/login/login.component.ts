import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['zenduser@gmail.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true; // Tampilkan spinner saat loading
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false; // Sembunyikan spinner setelah login berhasil
        this.router.navigate(['/dashboard']);

        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email }));
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.isLoading = false; // Sembunyikan spinner saat terjadi error
      },
    });
  }
}
