import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-categories',
    templateUrl: './product-categories.component.html',
    styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
    public ASSETS_URL: string = environment.ASSETS_URL;
    public id: any;
    public subCategoryData: Array<any> = [];
    public errorMsg!: any;

    constructor(
            private api: ApiService,
            private activatedRoute: ActivatedRoute
        ) { }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getSubCategoryList();
    }

    getSubCategoryList() {
        this.api.getSubCategoryList(this.id).subscribe(
            (response) => {
                this.handleSubCategoryResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }

    handleSubCategoryResponse(response: any) {
        if (response.statusCode === 1) {
            console.log('subcat', response);
            this.subCategoryData = response.responseData;
        }
        if (response.statusCode === 0) {
            // show modal with error here
            this.errorMsg = response.message;
        }
    }
}
