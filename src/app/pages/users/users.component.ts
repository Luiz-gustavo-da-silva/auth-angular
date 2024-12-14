import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/user-interface copy';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { MatDialog } from '@angular/material/dialog';
import { LayoutComponent } from '../../layouts/layout/layout.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Status } from '../../core/models/status-interface';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    LayoutComponent,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'contactNumber',
    'status',
  ];
  dataSource = new MatTableDataSource<User>([]);

  userRole: string | null = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private autenticacaoService: AutenticacaoService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.userRole = this.autenticacaoService.getRole();
  }

  findAll() {
    this.usersService.findAll().subscribe({
      next: (response: User[]) => {
        this.dataSource.data = response.map(user => ({
          ...user,
          status: user.status === 'true' || user.status === true
        }));
      },
      error: (err) => {
        this.snackbarService.showSnackBar("Error find all!", "error");
      },
    });
  }

  onStatusChange(e: User): void {
    const status: Status = {
      id: e.id,
      status: String(e.status),
    }

    this.usersService.updateStatus(status).subscribe({
      next: (response) => {
        this.snackbarService.showSnackBar("Status updated successfully!", "success");
        this.findAll();
      },
      error: (err) => {
        this.snackbarService.showSnackBar("Error updating status. Please try again", "error");
      },
    });
  }
}
