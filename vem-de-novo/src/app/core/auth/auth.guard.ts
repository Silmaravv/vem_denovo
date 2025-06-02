import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; // Importe a função inject
import { AuthService } from './auth.service'; // Importe seu AuthService

export const authGuard: CanActivateFn = (route, state) => {
  // Injeta o AuthService e o Router dentro do functional guard
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Usuário logado, permite acesso à rota
  } else {
    // Usuário não logado, redireciona para a página de login
    return router.createUrlTree(['/admin/login']);
  }
};
