import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, throwError} from "rxjs";

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  console.log(req)
  if (!req.url.includes("/auth/login")) {
    let newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accessToken}`
    }});
    return next(newReq).pipe(
      catchError(
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              authService.logout();
            }
          }
          return throwError(() => err)
        })
    );
  }
  else return next(req);
};
