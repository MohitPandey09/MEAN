import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LayoutModule } from '../layout/layout.module';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailsComponent,
        ProductCategoriesComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        LayoutModule
    ]
})
export class ProductModule { }
