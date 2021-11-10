import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
    constructor(
        private auth: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ this.auth.getToken() }`
            }
        });
        return next.handle(request);
    }
}
