import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public apiUrl = environment.apiUrl;
    public headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient
    ) { }

    loginApi(data: any): Observable<any> {
        return this.http.post(this.apiUrl + 'login', data, { headers: this.headers });
    }

    registerApi(data: any): Observable<any> {
        return this.http.post(this.apiUrl + 'register', data, { headers: this.headers });
    }

    getCategoryList(): Observable<any> {
        return this.http.post(this.apiUrl + 'getCategories', { headers: this.headers });
    }

    getSubCategoryList(id: any): Observable<any> {
        console.log('called', id);
        return this.http.post(this.apiUrl + 'getSubCategories', id, { headers: this.headers });
    }

    getProductList(): Observable<any> {
        return this.http.post(this.apiUrl + 'getProducts', { headers: this.headers });
    }
}
