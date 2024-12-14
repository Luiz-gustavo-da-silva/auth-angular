import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../../../core/models/category-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacaoService } from '../../../core/services/autenticacao.service';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss',
})
export class CategoryModalComponent{
  category: Category = {
    name: '',
  };

  action: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.action = true;
      this.category = { ...data };
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.action ? this.updateCategory() : this.addCategory();
    this.dialogRef.close(this.category);
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category).subscribe({
      next: (response) => {
        this.showSnackBar('Categoria atualizada com sucesso!', 'success');
        this.onClose();
      },
      error: (err) => {
        this.showSnackBar('Erro ao atualizar a categoria.', 'error');
      },
    });
  }

  addCategory() {
    this.categoryService.addCategory(this.category).subscribe({
      next: (response) => {
        this.showSnackBar('Categoria adicionada com sucesso!', 'success');
        this.onClose();
      },
      error: (err) => {
        this.showSnackBar('Erro ao adicionar a categoria.', 'error');
      },
    });
  } 

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: action === 'success' ? ['snack-success'] : ['snack-error'],
    });
  }
}
