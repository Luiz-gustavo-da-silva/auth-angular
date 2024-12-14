import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../../pages/home/home.component').then(
        (c) => c.HomeComponent,
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('../../pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../../pages/users/users.component').then(
        (c) => c.UsersComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../../pages/profile/profile.component').then(
        (c) => c.ProfileComponent,
      ),
  },
];
