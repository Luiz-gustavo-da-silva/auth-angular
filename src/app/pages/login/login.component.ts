import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { LoginForm } from '../../core/models/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    },
    { updateOn: 'submit' },
  );
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValues = this.form.getRawValue();

    const form: LoginForm = {
      email: formValues.email,
      password: formValues.password,
    }

    this.autenticacaoService.login(form).subscribe({
      next: () => {
        this.router.navigateByUrl('/app/home');
      },
      error: (err) => {
        this.errorMessage = err.message || 'Ocorreu um erro';
      },
    });
  }
}
