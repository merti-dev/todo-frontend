import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword = signal(false);
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  form; // constructor içinde başlatılacak

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true],
    });
  }

  toggleShowPassword() {
    this.showPassword.update((v) => !v);
  }

  login() {
    if (this.form.invalid || this.loading()) return;
    this.loading.set(true);
    this.errorMsg.set(null);

    const { username, password, remember } = this.form.getRawValue();

    this.http
      .post<{ token: string }>('/api/auth/login', { username, password })
      .subscribe({
        next: (res) => {
          if (remember) localStorage.setItem('token', res.token);
          else sessionStorage.setItem('token', res.token);

          this.loading.set(false);
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.loading.set(false);
          this.errorMsg.set('Kullanıcı adı veya şifre hatalı.');
        },
      });
  }
}
