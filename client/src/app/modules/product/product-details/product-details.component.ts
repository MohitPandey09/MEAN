import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    public assetsUrl = environment.assetsUrl;

    constructor() { }

    ngOnInit() {
    }

}
