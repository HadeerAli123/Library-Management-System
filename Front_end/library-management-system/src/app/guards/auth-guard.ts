import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService); 
  const router: Router = inject(Router);
  const role = authService.getUserRole();

  if (authService.isAuthenticated()) {
    if (role === 'admin') {
      return true;
    } else if (role === 'user') {
      router.navigate(['/dashboard/user']);
      return false;
    }
  }
  router.navigate(['/login']);
  return false;
};