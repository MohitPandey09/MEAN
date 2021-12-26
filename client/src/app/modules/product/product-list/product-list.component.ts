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
    public productId: any = {
        id: null
    };

    constructor(
        private api: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.productId.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getSubCategoryList();
    }

    getSubCategoryList() {
        this.api.getSubCategoryList(this.productId).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }
}
