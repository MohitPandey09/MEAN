import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() { }

    getToken() {
        return localStorage.getItem('token');
    }

    setToken(token: any) {
        JSON.stringify(localStorage.setItem('token', token));
    }

    getUserId() {
        const user = JSON.parse(localStorage.getItem('userData')!);
        return user.id;
    }

    getUsername() {
        const user = JSON.parse(localStorage.getItem('userData')!);
        return user.name;
    }

    getUserEmail() {
        const user = JSON.parse(localStorage.getItem('userData')!);
        return user.email;
    }

    destroyToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }
}
