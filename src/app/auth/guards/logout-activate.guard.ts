
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export class LogoutActivateGuard implements CanActivate {

  constructor(

  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }


}
// export const logoutActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
//   const id = +route.params['id'];

//   if(isNaN(id) || id < 1) {
//     return inject(Router).createUrlTree(['/restaurants']);
//   }
//   return true;
// };



// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthService } from "src/app/auth/services/auth-service";

// export class LogoutActivateGuard implements CanActivate {

//   constructor (
//     public authService: AuthService,
//     public router: Router
//   ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       if(this.authService.isLogged()) {
//         this.router.navigate(['/restaurants']);
//         return true;
//       }

//       return false;
//     }
// }
