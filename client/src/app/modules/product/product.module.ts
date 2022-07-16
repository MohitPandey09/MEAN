import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LayoutModule } from '../layout/layout.module';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailsComponent,
        ProductCategoriesComponent,
        ProductFilterComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        LayoutModule
    ]
})
export class ProductModule { }
