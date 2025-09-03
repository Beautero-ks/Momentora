import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next):Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('momentora-token');
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
