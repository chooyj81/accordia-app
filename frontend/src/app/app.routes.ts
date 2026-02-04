import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ItemsListComponent } from './pages/items-list/items-list';
import { ItemFormComponent } from './pages/item-form/item-form';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard] },
  { path: 'items/new', component: ItemFormComponent, canActivate: [AuthGuard] },
  { path: 'items/:id/edit', component: ItemFormComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'items' }
];
