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

    getSubCategoryList(categoryID: any): Observable<any> {
        return this.http.get(this.API_URL + `getSubCategoriesByID/${categoryID}`, { headers: this.headers });
    }

    getProductList(): Observable<any> {
        return this.http.get(this.API_URL + 'getProducts', { headers: this.headers });
    }

    getProductsBySubcategoryID(subcategoryID: any): Observable<any> {
        return this.http.get(this.API_URL + `getProductsBySubcategoryID/${subcategoryID}`, { headers: this.headers });
    }

    getProductDetails(productID: any): Observable<any> {
        return this.http.get(this.API_URL + `getProductDetails/${productID}`, { headers: this.headers });
    }

    addItemToCart(productID: any): Observable<any> {
        return this.http.post(this.API_URL + 'addItemToCart', productID, { headers: this.headers });
    }

    getCartItems(): Observable<any> {
        return this.http.get(this.API_URL + 'getCartItems', { headers: this.headers });
    }

    deleteCartItem(productID: any): Observable<any> {
        return this.http.delete(this.API_URL + `deleteCartItem/${productID}`, { headers: this.headers });
    }

    favourite(productID: any): Observable<any> {
        return this.http.get(this.API_URL + `favourite/${productID}`, { headers: this.headers });
    }

    getFavourites(): Observable<any> {
        return this.http.get(this.API_URL + `getFavourites`, { headers: this.headers });
    }

    checkCoupon(couponCode: any): Observable<any> {
        console.log(couponCode);
        return this.http.get(this.API_URL + `checkCoupon/${couponCode}`, { headers: this.headers });
    }

    getPaymentIntentKey(): Observable<any> {
        return this.http.post(this.API_URL + 'createPaymentIntent', { headers: this.headers })
    }

    createCheckout(data: any): Observable<any> {
        return this.http.post(this.API_URL + 'createCheckout', data, { headers: this.headers });
    }
}
