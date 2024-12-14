import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { CommonModule } from '@angular/common';
import { SignupForm } from '../../core/models/signup-form';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [provideNgxMask()],
})
export class SignupComponent {
    form!: FormGroup;
    errorMessage: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private autenticacaoService: AutenticacaoService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        contactNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      },
      { updateOn: 'submit' },
    );
    }
  
    onSubmit(): void {
      if (this.form.invalid) return;
  
      const formValues = this.form.getRawValue();
  
      const form: SignupForm = {
        email: formValues.email,
        name: formValues.name,
        contactNumber: formValues.contactNumber,
        password: formValues.password,
      }

      console.log(form);
  
      this.autenticacaoService.signup(form).subscribe({
        next: (response) => {
          console.log(response.massage);
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          this.errorMessage = err.message || 'Ocorreu um erro';
        },
      });
    }
}
