import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { environment } from '../../../../environtments/environtment';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  providers: [
    // { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.siteKey },
  ],
  // template: `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private recaptchaV3Service: ReCaptchaV3Service,
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

    this.isLoading = true;

    // Jalankan reCAPTCHA
    this.recaptchaV3Service.execute(
      environment.recaptcha.siteKey,
      'importantAction',
      (token: string) => {
        console.log('reCAPTCHA token:', token);

        // Kirim data login dan token ke backend
        const { email, password } = this.loginForm.value;

        this.authService.login(email, password, token).subscribe({
          next: () => {
            this.isLoading = false;
            // alert('Login berhasil!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errMessage = err.error.message;
            // alert('Login gagal: ' + err.error.message);
          },
        });
      },
      {
        useGlobalDomain: false, // Pilihan opsional
      }
    );
  }
}
