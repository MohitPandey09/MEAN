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
    public assetsUrl: string = environment.assetsUrl;
    public subCategoryParam = {
        id: null
    };
    public subCategoryData: Array<any> = [];
    public errorMsg: string = null;

    constructor(
        private api: ApiService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subCategoryParam.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getSubCategoryList();
    }

    getSubCategoryList() {
        this.api.getSubCategoryList(this.subCategoryParam).subscribe(
            (response) => {
                this.handleSubCategoryResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }

    handleSubCategoryResponse(response: any) {
        if (response.status === 1) {
            console.log('subcat', response);
            this.subCategoryData = response.responseData;
        }
        if (response.status === 0) {
            // show modal with error here
            this.errorMsg = response.message;
        }
    }
}
