import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        if (token) {
            return true;
        } else {
            return false;
        }
    }
}
