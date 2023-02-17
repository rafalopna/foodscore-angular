
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token') as string;

    const reqClone = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    console.log("TOKEN :  " + token);
    return next(reqClone);
};
