import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth-service";

export class LoginActivateGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
      if(!this.authService.isLogged()) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
  }
}
