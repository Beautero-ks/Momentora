import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(!authService.isAuthenticated()) {
    router.navigateByUrl('/auth/login');
    return false;
  }
  return true;
};
