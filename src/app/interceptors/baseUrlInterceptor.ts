import { HttpInterceptorFn } from "@angular/common/http";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const serverUrl = 'http://arturober.com:5010';

  const reqClone = req.clone({
    url: `${serverUrl}/${req.url}`,
  });

  return next(reqClone);
};
