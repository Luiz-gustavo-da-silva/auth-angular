import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutComponent } from '../../layouts/layout/layout.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Category } from '../../core/models/category-interface';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../../shared/components/category-modal/category-modal.component';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [LayoutComponent, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>([]);

  errorMessage: string | null = null;
  userRole: string | null = null;

  constructor(
     private categoryService: CategoryService,
     private router: Router,
     public dialog: MatDialog,
     private autenticacaoService: AutenticacaoService,
   ) {}

  ngOnInit(): void {
      this.findAll();
      this.userRole = this.autenticacaoService.getRole();
  }

  findAll() {
    this.categoryService.findAll().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Ocorreu um erro';
      },
    });
  }

  addCategory(){
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(() => {
      this.findAll();
    });
  }
  
  updateCategory(element: any){
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(() => {
      this.findAll();
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}


