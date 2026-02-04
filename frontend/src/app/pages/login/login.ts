import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  error = '';
  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private zone: NgZone
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/items']),
      error: (e) => {
        const msg =
          (typeof e?.error === 'string' && e.error) ||
          e?.error?.message ||
          'Login failed';

        // makes the error render immediately (no “only appears after typing” issue)
        this.zone.run(() => (this.error = msg));
      }
    });
  }
}
