import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const isAuthPath = req.url.startsWith('/api/auth/') || req.url.includes('/api/auth/');

  if (!isAuthPath && token && (req.url.startsWith('/api') || req.url.includes('://localhost:8080/api'))) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
