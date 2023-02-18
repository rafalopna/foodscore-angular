import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY } from "rxjs";
import { User } from "src/app/auth/interfaces/user";
import { UserService } from "../services/user.service";

export const userResolver: ResolveFn<User> = (route) => {
  return inject(UserService).getUser(+route.params['id'])
    .pipe(
      catchError(() => {
        inject(Router).navigate(['/users']);
        return EMPTY;
      })
    )
}
