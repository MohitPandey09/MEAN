import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    public ASSETS_URL = environment.ASSETS_URL;
    public isLoaded: boolean = false;
    public productID: any;
    public product = {
        _id: null,
        name: null,
        description: null,
        price: null,
        image: null
    };
    public subcategory = {
        _id: null,
        name: null
    };
    public errorMsg!: any;
    public quantity = 1;
    public productColor: Array<any> = [];
    public productSize: Array<any> = [];
    public addItemData = {};

    constructor(
            private api: ApiService,
            private router: Router,
            private activatedRoute: ActivatedRoute,
            private token: TokenService
        ) { }

    ngOnInit() {
        this.productID = this.activatedRoute.snapshot.paramMap.get('id');
        this.getProductDetails();
    }

    getProductDetails() {
        this.api.getProductDetails(this.productID).subscribe(
            (response) => {
                this.handleProductDetailsResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        )
    }

    handleProductDetailsResponse(response: any) {
        console.log('Product details', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.product = response.responseData;
            this.subcategory = response.responseData.subcategory;
            this.productColor = response.responseData.availableColors;
            this.productSize = response.responseData.availableSize;
        }
        if (response.statusCode === 0) {
            // show modal with error here
this.isLoaded = true;
            this.errorMsg = response.message;
        }
    }

    addItemToCart(productID: any) {
        this.isLoaded = false;
        let product = { productID }
        this.api.addItemToCart(product).subscribe(
            response => {
                this.handleAddItemToCartResponse(response);
            },
            error => {
                console.log('Error: ', error);
            }
        )
    }

    handleAddItemToCartResponse(response: any) {
        console.log('Add Item', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.router.navigate(['cart']);
        }
        if (response.statusCode === 0) {
            // show modal with error here
            this.isLoaded = true;
            this.errorMsg = response.message;
        }
    }

    // incrementItem() {
    //     this.quantity = this.quantity + 1;
    // }

    // decrementItem() {
    //     this.quantity = this.quantity - 1;
    // }

    // removeItem(productID: any) {
    //     this.api.deleteCartItem(productID).subscribe(
    //         response => {
    //             this.handleDeleteCartItemResponse(response);
    //         },
    //         error => {
    //             console.log('Error: ', error);
    //         }
    //     )
    // }

    // handleDeleteCartItemResponse(response: any) {
    //     console.log('Add Item', response);
    //     if (response.statusCode === 1) {
    //         // this.product = response.responseData;
    //     }
    //     if (response.statusCode === 0) {
    //         // show modal with error here
    //         this.errorMsg = response.message;
    //     }
    // }
}
