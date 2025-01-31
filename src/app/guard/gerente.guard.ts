import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';

export const gerenteGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado) {
    if (authService.getRole() == 'gerente' || authService.getRole()== 'adm') {
      return true;
    } else {
      alert("Você não tem permissão")
      router.navigate(['/home']);
      return false;
    }
  } else {
    console.log('Você não esta autenticado');
    router.navigate(['/login']);
    return false;
  }
};
