import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public API_URL = environment.API_URL;
    public headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient
    ) { }

    loginApi(data: any): Observable<any> {
        return this.http.post(this.API_URL + 'login', data, { headers: this.headers });
    }

    registerApi(data: any): Observable<any> {
        return this.http.post(this.API_URL + 'register', data, { headers: this.headers });
    }

    getCategoryList(): Observable<any> {
        return this.http.get(this.API_URL + 'getCategories', { headers: this.headers });
    }

    getSubCategoryList(id: any): Observable<any> {
        return this.http.post(this.API_URL + 'getSubCategories', id, { headers: this.headers });
    }

    getProductList(): Observable<any> {
        return this.http.post(this.API_URL + 'getProducts', { headers: this.headers });
    }

    getPaymentIntentKey(id: any): Observable<any> {
        console.log('works', id);        
        return this.http.post(this.API_URL + 'createPaymentIntent', id, { headers: this.headers })
    }

    createCheckout(data: any): Observable<any> {
        return this.http.post(this.API_URL + 'createCheckout', data, { headers: this.headers });
    }
}
