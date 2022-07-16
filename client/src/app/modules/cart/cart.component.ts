import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public couponForm!: FormGroup;
    public ASSETS_URL: string = environment.ASSETS_URL;
    public isLoaded: boolean = false;
    public subTotalPrice: any;
    public totalPrice: any;
    public discount: any;
    public totalPriceAfterDiscount: any;
    public cartItems: Array<any> = [];
    public submitted = false;
    public quantity!: any;
    public errorMsg!: any;

    constructor(
            private fb: FormBuilder,
            private api: ApiService
        ) { }

    ngOnInit(): void {
        this.couponForm = this.fb.group({
            couponCode: ['', Validators.required]
        });
        this.getCartItems();
    }

    get f() {
        return this.couponForm.controls;
    }

    onCouponSubmit() {
        this.submitted = true;
        this.isLoaded = false;
        if (this.couponForm.invalid) {
            this.isLoaded = true;
            return;
        }

        this.api.checkCoupon(this.couponForm.value.couponCode).subscribe(
            response => {
                this.isLoaded = true;
                this.handleCouponResponse(response);
                console.log(response);
            },
            error => {
                this.isLoaded = true;
                console.log('Error: ', error);
            }
        )
    }

    handleCouponResponse(response: any) {
        console.log('Coupon', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.discount = response.responseData.discountAmount;
            this.subTotalPrice = this.totalPrice;
            this.totalPrice = response.responseData.finalPrice;
        }
        if (response.statusCode === 0) {
            this.isLoaded = true;
            this.cartItems.length = 0;
            this.errorMsg = response.message;
        }
    }

    getCartItems() {
        this.api.getCartItems().subscribe(
            response => {
                this.handleGetCartItemsResponse(response);
            },
            error => {
                console.log('Error: ', error);
            }
        )
    }

    handleGetCartItemsResponse(response: any) {
        console.log('Cart Items', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.cartItems = response.responseData.items;
            // this.subTotalPrice = response.responseData.subTotalPrice;
            this.subTotalPrice = this.totalPrice = response.responseData.totalPrice;
        }
        if (response.statusCode === 0) {
            this.isLoaded = true;
            this.cartItems.length = 0;
            this.errorMsg = response.message;
        }
    }

    incrementItem(productID: any) {
        this.isLoaded = false;
        let product = { productID }
        this.api.addItemToCart(product).subscribe(
            response => {
                this.handleIncrementItemResponse(response);
            },
            error => {
                console.log('Error: ', error);
            }
        )
    }

    handleIncrementItemResponse(response: any) {
        console.log('Add Item', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            window.location.reload();
            // this.product = response.responseData;
        }
        if (response.statusCode === 0) {
            this.isLoaded = true;
            // show modal with error here
            this.errorMsg = response.message;
        }
    }

    decrementItem(productID: any) {
        this.isLoaded = false;
        this.api.deleteCartItem(productID).subscribe(
            response => {
                this.handleDecrementItemResponse(response);
            },
            error => {
                console.log('Error: ', error);
            }
        )
    }

    handleDecrementItemResponse(response: any) {
        console.log('Remove Item', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            window.location.reload();
            // this.product = response.responseData;
        }
        if (response.statusCode === 0) {
            // show modal with error here
            this.isLoaded = true;
            this.errorMsg = response.message;
        }
    }

}
