import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() { }

    getToken() {
        localStorage.getItem('token');
    }

    setToken(token: any) {
        localStorage.setItem('token', token);
    }

    destroyToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }
}
