import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../../layouts/layout/layout.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangePasswordForm } from '../../core/models/changePassword-interface';
import { UsersService } from '../../core/services/users.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LayoutComponent, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(5)]],
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      { updateOn: 'submit' }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValues = this.form.getRawValue();

    const form: ChangePasswordForm = {
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword,
    };

    this.usersService.changePassword(form).subscribe({
      next: (response) => {
        this.snackbarService.showSnackBar("Updated successfully!", "success")
      },
      error: (err) => {
        this.snackbarService.showSnackBar("Error updating", "error");
      },
    });
  }
}
