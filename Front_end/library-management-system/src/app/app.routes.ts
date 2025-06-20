import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { AuthGuard } from './guards/auth-guard';
import { AddBookComponent } from './components/books/add/add.component';
import { EditBookComponent } from './components/books/edit/edit.component';
import { DetailComponent } from './components/books/detail/detail.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent }
    ]
  },
  { path: 'books/add', component: AddBookComponent }, 
  { path: 'books/:id/edit', component: EditBookComponent }, 
  { path: 'books/:id/detail', component: DetailComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];