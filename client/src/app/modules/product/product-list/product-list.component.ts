import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public ASSETS_URL = environment.ASSETS_URL;
    public isLoaded: boolean = false;
    public subcategoryID: any;
    public productData: Array<any> = [];
    public favourites: Array<any> = [];
    public cartData = {
        userID: '',
        items: [
            'productID',
            'quantity',
            'price'
        ]
    };
    public errorMsg!: any;

    constructor(
        private api: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subcategoryID = this.activatedRoute.snapshot.paramMap.get('id');
        this.getProductByID();
        this.getFavourites();
    }

    getProductByID() {
        this.api.getProductsBySubcategoryID(this.subcategoryID).subscribe(
            (response) => {
                this.handleProductResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }

    handleProductResponse(response: any) {
        console.log('Product List', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.productData = response.responseData;
        }
        if (response.statusCode === 0) {
            // show modal with error here
            this.isLoaded = true;
            this.errorMsg = response.message;
        }
    }

    addItemToCart(productID: any) {
        this.isLoaded = false;
        this.api.addItemToCart(productID).subscribe(
            (response) => {
                this.handleAddItemToCartResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        )
    }

    handleAddItemToCartResponse(response: any) {
        if (response.statusCode === 1) {
            this.isLoaded = true;
            console.log('Add item to cart', response);
            // this.productData = response.responseData;
        }
        if (response.statusCode === 0) {
            // show modal with error here
            this.isLoaded = true;
            this.errorMsg = response.message;
        }        
    }

    getFavourites() {
        this.api.getFavourites().subscribe(
            (response) => {
                this.handleGetFavouriteResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }

    handleGetFavouriteResponse(response: any) {
        console.log('Favourites List', response);
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.favourites = response.responseData.product;
        }
        if (response.statusCode === 0) {
            // show modal with error here
            this.isLoaded = true;
            this.errorMsg = response.message;
        }
    }

    favourite(productID: any) {
        this.isLoaded = false;
        this.api.favourite(productID).subscribe(
            response => {
                this.isLoaded = true;
                console.log(response);
            },
            error => {
                this.isLoaded = true;
                console.log('Error: ', error);
            }
        )
    }
}
